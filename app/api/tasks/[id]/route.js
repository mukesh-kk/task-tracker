
import { getTasks,saveTasks } from "@/utils.js/getdatautils";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { status } = await req.json();
  let tasks = getTasks();
  tasks = tasks.map((task) =>
    task.id ===id? { ...task, status } : task
  );
  saveTasks(tasks);
  return NextResponse.json({ message: "Task updated" });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  let tasks = getTasks();
  tasks = tasks.filter((task) =>{
    if( task.id==id){
       return false
    }
    return true
  }
  );
  saveTasks(tasks);
  return NextResponse.json({ message: "Task updated" });
}
