import { NextResponse } from "next/server";
import { tasks } from "../data/tasks";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { Task } from "@/types/TaskInterface";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json(
      { error: "Missing start or end date" },
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), "src/app/api/data/tasks.ts");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Extract the array from the file content
  const tasks = eval(fileContent.replace("export const tasks =", "").trim());

  const userTasks = tasks.filter((t: Task) => {
    const taskDate = new Date(t.date);
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (
      t.userid === session.user.id &&
      taskDate >= startDate &&
      taskDate <= endDate
    );
  });
  console.log(userTasks);

  return NextResponse.json(userTasks);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { taskType, projectName, date, totalHours, description } =
    await request.json();

  const newTask: Task = {
    id: "task" + (tasks.length + 1).toString(),
    userid: session.user.id,
    taskType,
    projectName,
    date,
    totalHours,
    completedHours: 0,
    description,
  };

  tasks.push(newTask);
  const filePath = path.join(process.cwd(), "src/app/api/data/tasks.ts");
  const fileContent = `export const tasks = ${JSON.stringify(tasks, null, 2)}`;
  fs.writeFileSync(filePath, fileContent);

  console.log(tasks);

  return NextResponse.json(newTask, { status: 201 });
}



export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const updatedTasks = tasks.filter(
      (task: Task) => task.id !== taskId
    );

    
    const filePath = path.join(process.cwd(), "src/app/api/data/tasks.ts");
    const fileContent = `export const tasks = ${JSON.stringify(updatedTasks, null, 2)};`;
    fs.writeFileSync(filePath, fileContent);

    console.log(`Deleted task ${taskId}`);
    return NextResponse.json({ success: true, id: taskId });

  } catch (error) {

    console.error( "Error deleting task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}