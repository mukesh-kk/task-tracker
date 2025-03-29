
import { getTasks,saveTasks } from "@/utils.js/getdatautils";
import { NextResponse } from "next/server";
// update subtask status
export async function PUT(req, { params }) {
    console.log(params)
  const { id ,sid} = params;
  const { status } = await req.json();
  let tasks = getTasks();
  tasks = tasks.map((task) =>{
    if( task.id==id){
        const sts=task.subtasks.map((st)=>{
            if (st.id==sid){
                 st.status=status
            }
            return st
        })

    }
    return task
  }
  );
  saveTasks(tasks);
  return NextResponse.json({ message: "Task updated" });
}

export async function DELETE(req, { params }) {
    const { id ,sid} = params;
    let tasks = getTasks();
    tasks = tasks.map((task) =>{
      if( task.id==id){
          const sts=task.subtasks.filter((st)=>{
              if (st.id==sid){
                   return false
              }
              return true
          })
          task.subtasks=sts
  
      }
      return task
    }
    );
    saveTasks(tasks);
    return NextResponse.json({ message: "SubTask Deleted" });
  }