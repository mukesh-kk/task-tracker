import { useEffect, useState } from "react";
import Plus from "./icon/Plus";
import Delete from "./icon/Delete";
import { addSubtask, deleteSubTask, deleteTask, updateStatus, updateSubtaskStatus } from "@/utils.js/apicalls";

export default function TaskItem({ task, setTasks,setLoading }) {
    const [subtaskInput, setSubtaskInput] = useState("");
    const [showAddTask, setShowAddTask] = useState(false);
    const [per, setPer] = useState(0)
    useEffect(() => {
        if (task.status == 'Done') {
            setPer(100)
        } else {
            if (!task.subtasks.length) {
                return
            }
            let count = 0
            task.subtasks.forEach(element => {
                if (element.status == 'Done') { count += 1 }
            });
            setPer(100 * count / task.subtasks.length)
        }

    }, [task])

    return (
        <div className="p-3 border border-[#0073ff]  rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center w-full">
                <p className="text-lg break-words whitespace-normal max-w-[60%] overflow-hidden">
                    <span className="text-lg font-bold text-[#035ac5]">Task :</span> {task.description}
                </p>
                <div className="flex items-center justify-center gap-2">
                    <Delete onDelete={() => deleteTask(task.id, setTasks,setLoading)} />
                    <select
                        className={`rounded-md text-white px-2 py-1 ${task.status === "In Progress"
                                ? "bg-[#135cc2]"
                                : task.status === "Done"
                                    ? "bg-[#2678ec]"
                                    : "bg-[#103569]"
                            }`}
                        value={task.status}
                        onChange={(e) => updateStatus(task, e.target.value, setTasks,setLoading)}
                    >
                        <option value="To Do" className="bg-white text-black">To Do</option>
                        <option value="In Progress" className="bg-yellow-100 text-black">In Progress</option>
                        <option value="Done" className="bg-green-600 text-black">Done</option>
                    </select>
                </div>
            </div>
            <div className=" mt-4 w-full rounded-[5px] h-[4px] bg-[#a0caff] relative">
                <div style={{ width: `${per}%`, transition: "width 1s ease-in-out" }}
                    className={` h-[4px] rounded-[5px] ${per > 49 ? "bg-[#4891f7]" : "bg-[#103569]"}`}>
                </div></div>

            {/* Subtasks List */}
            {task.subtasks && task.subtasks.length > 0 ? (
                <div className="ml-5 mt-2  ">
                    <h4 className="text-sm font-semibold text-[#0b79ff]">Subtasks:</h4>
                    {task.subtasks.map((subtask) => (
                        <div
                            key={subtask.id}
                            className={`flex flex-col md:flex-row list-disc 
        justify-between items-start md:items-center p-2 mt-4 border-b-1 ${subtask.status === "In Progress"
                                    ? "border-b-[#1c365a]"
                                    : subtask.status === "Done"
                                        ? "border-b-[#69a4f8]"
                                        : "border-b-[#0d213d]"
                                } rounded-md bg-gray-50 w-full`}
                        >
                            {/* Subtask Description - Ensure Wrapping */}
                            <span className="w-full md:w-3/5 break-words overflow-hidden text-wrap">
                                {subtask.description}
                            </span>

                            {/* Status Selector + Delete Button */}
                            <div className="flex items-center justify-between md:justify-center w-full md:w-auto gap-2 mt-2 md:mt-0">
                                <Delete onDelete={() => deleteSubTask(task.id, subtask.id, setTasks,setLoading)} />
                                <select
                                    className={`rounded-md text-white p-1 ${subtask.status === "In Progress"
                                            ? "bg-[#135cc2]"
                                            : subtask.status === "Done"
                                                ? "bg-[#5096f7]"
                                                : "bg-[#103569]"
                                        }`}
                                    value={subtask.status}
                                    onChange={(e) => updateSubtaskStatus(task,e.target.value, subtask.id, task.id, setTasks,setLoading)}
                                >
                                    <option value="To Do" className="bg-white text-black">To Do</option>
                                    <option value="In Progress" className="bg-yellow-400 text-black">In Progress</option>
                                    <option value="Done" className="bg-green-500 text-black">Done</option>
                                </select>
                            </div>
                        </div>
                    ))}


                </div>
            ) : <></>}
            {showAddTask && <div className="mt-2 flex items-center gap-2">
                <input
                    type="text"
                    value={subtaskInput}
                    onChange={(e) => setSubtaskInput(e.target.value)}
                    placeholder="Add a subtask..."
                    className="border p-2  w-full border-[#0073ff] rounded-lg outline-[#489BFF]"
                />
                <button onClick={() => addSubtask(task,setTasks, subtaskInput, setSubtaskInput, setShowAddTask,setLoading)} className="bg-blue-500 text-white px-3 py-1 rounded"> <Plus color='white' /></button>
            </div>}
            {!showAddTask && <button className="pl-4 flex mt-4" onClick={() => setShowAddTask(true)}> <Plus color={'#145BBE'} />Add Steps</button>}
        </div>
    );
}
