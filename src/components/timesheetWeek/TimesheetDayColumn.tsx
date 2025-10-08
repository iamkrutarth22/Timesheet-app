import TaskCard from "./TaskCard";
import AddTaskButton from "./AddTaskButton";
import { Task } from "@/types/TaskInterface";
import { dateShortFormat } from "@/utils/formatDate";

interface TimesheetDayColumnProps {
  date: string;
  tasks: Task[];
  refresh:()=> void
}

export default function TimesheetDayColumn({
  date,
  tasks,
  refresh
}: TimesheetDayColumnProps) {
  return (
    <div className="bg-card   mt-6 flex  gap-3">
      <h3 className="text-sm  w-1/12 font-medium">{dateShortFormat(date)}</h3>

      <div className="flex flex-col flex-1 gap-3">
        {
          tasks.map((task, i) => <TaskCard  key={task.id} task={task} refresh={refresh} />)
       }

        <AddTaskButton taskDate={date}  refresh={refresh}/>
      </div>
    </div>
  );
}
