import TimesheetStatusBadge from "./TimesheetStatusBadge";
import { Timesheet } from "@/types/TimesheetInterface";
import { formatDate } from "@/utils/formatDate";
import { Button } from "../ui/button";
import Link from "next/link";

export default function TimesheetRow({ timesheet ,weekNumber}: { timesheet: Timesheet ,weekNumber:number}) {

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3 bg-gray-50" >{weekNumber+1}</td>
      <td className="p-3">{formatDate(timesheet.start,timesheet.end)}</td> 
      <td className="p-3">
        <TimesheetStatusBadge status={timesheet.status} />
      </td>
      <td className="p-3">
        <div className="flex gap-2">
     
        <Button  variant="ghost"  size="sm" className="cursor-pointer text-blue-700">
         
          <Link href={`/timesheet/${timesheet.start}_${timesheet.end}`}> {timesheet.action}</Link>
        </Button>
    </div>
      </td>
    </tr>
  );
}
