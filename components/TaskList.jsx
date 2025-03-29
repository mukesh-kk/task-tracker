import TaskItem from "@/components/TaskItem";

export default function TaskList({ tasks, setTasks ,setLoading}) {
    return (
        <div className="space-y-2">
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks added yet.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem key={task.id} task={task} setTasks={setTasks}  setLoading={setLoading}/>
                ))
            )}
        </div>
    );
}