import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getTasks,saveTasks } from "@/utils.js/getdatautils";

// create

export async function POST(req) {
    const { subtaskDescription,taskId } = await req.json();
    let tasks = getTasks();
    const newSubTask={
        id:uuidv4(),
        status:'To Do',
        description:subtaskDescription
     }
    tasks=tasks.map((task)=>{
        if ( task.id==taskId){

             task.subtasks.push(newSubTask)
        }

        return task
    })


    saveTasks(tasks);
    
    return NextResponse.json(newSubTask, { status: 201 });
  }