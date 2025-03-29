'use client'
import { useState, useEffect } from "react";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import Image from "next/image";
import Loader from "@/components/Loader";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    setLoading(true)
    fetch("/api/tasks")
      .then(async (res) => {
  
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const text = await res.text(); 
        return text ? JSON.parse(text) : []; 
      })
      .then((data) => {
        setTasks(data);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]);
        setLoading(false) 
      });
  }, []);
  
  return (
   <><div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen ">
      <div className="flex  items-center">
        <Image src={'/todo.png'} width={100} height={100} alt="icon"/>
      <h1 className="text-3xl font-bold ">Task Tracker</h1>
      </div>
      <TaskInput setTasks={setTasks} setLoading={setLoading} />
      <TaskList tasks={tasks} setTasks={setTasks} setLoading={setLoading} />
    </div>
    {loading?<Loader/>:<></>}
    </> 
  );
}