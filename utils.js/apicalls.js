
export const updateStatus = async (task,newStatus, setTasks, setLoading) => {
    try {
        setLoading(true)
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( { status: newStatus }),
        });

        if (response.ok) {
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === task.id
                        ? {
                            ...t,
                            status:  newStatus
                        }
                        : t
                )
            );
        }
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
};


export const addSubtask = async (task, setTasks, subtaskInput, setSubtaskInput, setShowAddTask, setLoading) => {
    try {
        if (!subtaskInput.trim()) return;
        setLoading(true)
        const response = await fetch(`/api/tasks/${task.id}/subtask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subtaskDescription: subtaskInput, taskId: task.id }),
        });
        const newSubTask = await response.json();

        if (response.ok) {
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === task.id
                        ? {
                            ...t,
                            subtasks: [...(t.subtasks || []), newSubTask],
                        }
                        : t
                )
            );
            setSubtaskInput("");
            setShowAddTask(false)
        }

    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
};

export const updateSubtaskStatus = async (task, status, subtaskId, taskId, setTasks, setLoading) => {

    try {
        setLoading(true)
        const response = await fetch(`/api/tasks/${taskId}/subtask/${subtaskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: status }),
        });

        if (response.ok) {
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === task.id
                        ? {
                            ...t,
                            subtasks: t.subtasks?.map((sub) =>
                                sub.id === subtaskId ? { ...sub, status: status } : sub
                            ),
                        }
                        : t
                )
            );


        }
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
};

export const deleteSubTask = async (taskId, subtaskId, setTasks, setLoading) => {
    try {
        setLoading(true)
        const response = await fetch(`/api/tasks/${taskId}/subtask/${subtaskId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === taskId
                        ? {
                            ...t,
                            subtasks: t.subtasks?.filter((sub) => sub.id != subtaskId)
                        }
                        : t
                )
            );

        }

    } catch (error) {
        console.error(error)
    }
    finally {
        setLoading(false)
    }
}
export const deleteTask = async (taskId, setTasks, setLoading) => {
    try {
        setLoading(true)
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            setTasks((prev) =>
                prev.filter((t) => t.id !== taskId));
        }
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}