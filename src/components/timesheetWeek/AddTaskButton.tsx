"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function AddTaskButton({taskDate,refresh}:{taskDate:string,refresh:()=>void}) {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(0);
  const [project, setProject] = useState("");
  const [taskType, setTaskType] = useState("");
  const [description, setDescription] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName: project,
        taskType,
        totalHours: hours,
        description,
        date:taskDate
     }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Error adding task:", error);
      alert(error?.error || "Failed to add task");
      return;
    }

    const data = await res.json();
    console.log("Task added:", data);
    refresh()

    setHours(0);
    setProject("");
    setTaskType("");
    setDescription("");
    setOpen(false);

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong while adding the task.");
  }
};

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setHours(0);
      setProject("");
      setTaskType("");
      setDescription("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-4 w-full border-2 flex cursor-pointer border-dotted hover:border-[#1A56DB] hover:bg-[#E1EFFE] text-sm text-gray-500 hover:text-blue-700"
        >
          + Add new task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit} >
          <DialogHeader>
            <DialogTitle>Add New Entry</DialogTitle>
              </DialogHeader>

          <div className="border-b mt-5 mb-4" />

          <div className="grid gap-6 py-2">
            {/* Project Select */}
            <div className="grid gap-2 ">
              <Label htmlFor="project">Select Project *</Label>
              <Select value={project} onValueChange={setProject} >
                <SelectTrigger id="project" className="w-[300px]">
                  <SelectValue placeholder="Choose a project"  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project1">Project Alpha</SelectItem>
                  <SelectItem value="project2">Project Beta</SelectItem>
                  <SelectItem value="project3">Project Gamma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type of Work */}
            <div className="grid gap-2">
              <Label htmlFor="type">Type of Work *</Label>
              <Select value={taskType} onValueChange={setTaskType}>
                <SelectTrigger id="type" className="w-[300px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">UI Design</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="review">Code Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Task Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Task Description *</Label>
              <Textarea
                id="description"
                placeholder="write text here ..."
                className="resize-none"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
              />

              <span className="text-gray-500 text-sm font-light">A note for extra info</span>
            </div>

            {/* Hours */}
            <div className="grid gap-2">
              <Label htmlFor="hours">Hours *</Label>
              <div className="flex">
                <button  onClick={() => setHours((prev)=>prev-1)} type="button"  disabled={hours <= 0}  className="border-2 border-gray-300 w-[30px] h-[30px] rounded-l-sm bg-gray-200 hover:bg-gray-300 cursor-pointer ">-</button>
                <div   className="border-b-2 border-t-2 w-[30px] h-[30px] text-center bg-white border-gray-300">{hours}</div>
                <button onClick={() => setHours((prev)=>prev+1)}   type="button"    className="border-2 border-gray-300 w-[30px] h-[30px] rounded-r-sm bg-gray-200 hover:bg-gray-300 cursor-pointer ">+</button>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-center items-center mt-4">
            

            <Button type="submit" className="bg-blue-600 flex-1 cursor-pointer hover:bg-blue-700 text-white" disabled={hours===0 || description==='' || taskType==='' ||project===''}>
              Add Entry
            </Button>

            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
