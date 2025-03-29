'use client'
import { useState } from "react";
import Plus from "./icon/Plus";

export default function TaskInput({ setTasks,setLoading }) {
    const [taskDescription, setTaskDescription] = useState("");

    const addTask = async () => {
        if (!taskDescription.trim()) return;
        setLoading(true)
        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description: taskDescription }),
            });
    
            if (response.ok) {
                const newTask = await response.json();
                setTasks((prev) => [...prev, newTask]);
                setTaskDescription("");
            }
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
        
    };

    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                className="w-full p-2 border border-[#0073ff] rounded-lg outline-[#489BFF]"
                placeholder="Enter task..."
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <button
                onClick={addTask}
                className="px-8 py-4  bg-[#1980ff] text-white rounded-lg hover:bg-[#489BFF]"
            >
                <Plus color='white' />
            </button>
        </div>
    );
}
