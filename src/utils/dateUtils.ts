import { Task } from "@/types/TaskInterface";
import { Timesheet } from "@/types/TimesheetInterface";
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  isWithinInterval,
  eachDayOfInterval,
  parseISO,
  isBefore,
  
  isSameDay,
} from "date-fns";



export function getWeeksInRange(
  from: string,
  to: string,
  tasks: Task[],
  weekStartsOn: number = 5
): Timesheet[] {
  const startDate = parseISO(from);
  const endDate = parseISO(to);
  let currentStart = startDate; // Start exactly at the 'from' date
  const weeks: Timesheet[] = [];

  while (!isBefore(endDate, currentStart)) {
    // For the first week, use the 'from' date as the start
    let weekStart = currentStart;
    let weekEnd;

    if (isSameDay(currentStart, startDate)) {
      // First week: Start on 'from' date, end on the week's end or 'to' date
      weekEnd = endOfWeek(currentStart, {
        weekStartsOn: weekStartsOn as import("date-fns").Day,
      });
      if (isBefore(weekEnd, endDate)) {
        // Normal week end
      } else {
        weekEnd = endDate; // Cap at 'to' date
      }
    } else {
      // Subsequent weeks: Start on weekStartsOn (e.g., Friday)
      weekStart = startOfWeek(currentStart, {
        weekStartsOn: weekStartsOn as import("date-fns").Day,
      });
      weekEnd = endOfWeek(weekStart, {
        weekStartsOn: weekStartsOn as import("date-fns").Day,
      });
      if (isBefore(weekEnd, endDate)) {
        // Normal week end
      } else {
        weekEnd = endDate; // Cap at 'to' date
      }
    }

    // Only include the week if it starts on or after startDate
    if (!isBefore(weekStart, startDate)) {
      const weekTasks = tasks.filter((t) => {
        const taskDate = parseISO(t.date);
        return isWithinInterval(taskDate, {
          start: weekStart,
          end: weekEnd,
        });
      });

      const hours = weekTasks.reduce(
        (acu, task) => {
          return {
            totalHours: acu.totalHours + task.totalHours,
            completedHours: acu.completedHours + task.completedHours,
          };
        },
        { totalHours: 0, completedHours: 0 }
      );

      weeks.push({
        start: weekStart.toISOString().split("T")[0],
        end: weekEnd.toISOString().split("T")[0],
        tasks: weekTasks,
        status: hours.totalHours === 0 ? "missing" : hours.completedHours >= hours.totalHours ? "completed" : "incomplete",
        action: weekTasks.length === 0 ? "create" : hours.completedHours >= hours.totalHours ? "view" : "update",
      });
    }

    // Move to the next week
    currentStart = addWeeks(weekStart, 1);
  }

  return weeks;
}
export function getWeekForDate(
  dateStr: string,
  tasks: Task[],
  weekStartsOn: number = 5 // default Friday
) {
  const date = parseISO(dateStr);

  let weekStart = startOfWeek(date, { weekStartsOn: weekStartsOn as import("date-fns").Day });
  let weekEnd = endOfWeek(date, { weekStartsOn: weekStartsOn as import("date-fns").Day });

  // Ensure start <= end
  if (weekStart > weekEnd) [weekStart, weekEnd] = [weekEnd, weekStart];

  const weekTasks = tasks.filter((t) => {
    const taskDate = parseISO(t.date);
    return isWithinInterval(taskDate, { start: weekStart, end: weekEnd });
  });

  const days = eachDayOfInterval({ start: weekStart, end: weekEnd }).map((d) => {
    const dayStr = d.toISOString().split("T")[0];
    const dayTasks = weekTasks.filter((t) => t.date === dayStr);
    return { date: dayStr, tasks: dayTasks };
  });

  const hoursTotal = weekTasks.reduce((sum, t) => sum + t.totalHours, 0);
  const hoursCompleted = weekTasks.reduce((sum, t) => sum + t.completedHours, 0);

  return {
    start: weekStart.toISOString().split("T")[0],
    end: weekEnd.toISOString().split("T")[0],
    hoursTotal,
    hoursCompleted,
    days,
  };
}
