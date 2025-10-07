import { DailyTimesheet } from "@/types/TimesheetInterface";
import TimesheetDayColumn from "./TimesheetDayColumn";

// interface TimesheetGridProps {
//   days: {
//     date: string;
//     tasks:}[];
//   }[];
// }

export default function TimesheetGrid({ days ,refresh}: { days: DailyTimesheet[],refresh:()=>void }) {
  return (
    <div className="flex flex-col overflow-y-auto  ">
      {days.map((day, index) => (
        <TimesheetDayColumn key={index} date={day.date} tasks={day.tasks} refresh={refresh} />
      ))}
    </div>
  );
}
