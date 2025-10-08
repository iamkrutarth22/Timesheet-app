import { Task } from "./TaskInterface";
export interface Timesheet {
  start: string;
  end: string;
  status: "completed" | "incomplete" | "missing";
  action: "create" | "update" | "view";
  tasks?: Task[];
}

export interface DailyTimesheet {
  date: string;
  tasks: Task[];
}

export interface WeeklyTimesheet {
  start: string;
  end: string;
  hoursTotal: number;
  hoursCompleted: number;
  days: DailyTimesheet[];
}