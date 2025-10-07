
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Badge } from "../ui/badge";
import { Ellipsis } from "lucide-react";
import { Task } from "@/types/TaskInterface";



export default function TaskCard({task,refresh}:{task:Task,refresh:()=>void}) {
  const { id, taskType, projectName, totalHours } = task;

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        console.log("Task deleted:", id);
        refresh(); 
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }


  return (
    <div className="rounded-xl border p-3  transition">
      <div className="flex justify-between">
        <p className="font-medium text-sm">{taskType}</p>
        <div className="flex justify-between items-center text-xs text-muted-foreground space-x-2">
          <span>{totalHours} hrs</span>

          <Badge className="text-blue-800 bg-[#E1EFFE] ">{projectName}</Badge>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <Ellipsis />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Edit</MenubarItem>
                  <MenubarItem onClick={handleDelete} className="text-red-600">Delete</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
        </div>
      </div>
    </div>
  );
}
