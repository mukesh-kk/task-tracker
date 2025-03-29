import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getTasks,saveTasks } from "@/utils.js/getdatautils";


// get
export async function GET() {
    let tasks = getTasks();
    return NextResponse.json(tasks,{status:200})
}
// create
export async function POST(req) {
    const { description } = await req.json();
    let tasks = getTasks();
  
    const newTask = {
      id: uuidv4(),
      description,
      status: "To Do",
      subtasks: [],
    };
  
    tasks.push(newTask);
    saveTasks(tasks);
    
    return NextResponse.json(newTask, { status: 201 });
  }

//  edit

export async function PUT(req, { params }) {
  const { id } = params;
  const { status } = await req.json();
  let tasks = getTasks();

  tasks = tasks.map((task) => {
    if (task.id === id) {
     
        task.subtasks = task.subtasks.map((subtask) =>
           ({ ...subtask, status })
        );
     
        task.status = status;
      
    }
    return task;
  });

  saveTasks(tasks);
  return NextResponse.json({ message: "Task or subtask updated" });
}
