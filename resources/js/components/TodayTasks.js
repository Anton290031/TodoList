import React, {useEffect, useState} from 'react';
import Layout from "./Layout";
import TaskList from "./TaskList";

function TodayTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("/api/task/today")
            .then((response) => setTasks(response.data));
    },[]);

    const onDelete = (taskId) => {
        axios.delete("/api/task/" + taskId)
            .then(response => {
                if (response.status == 200)
                    setTasks(tasks.filter((t) => t.id != taskId));
            });
    };

    return (
        <Layout>
            <TaskList tasks={tasks} onDelete={onDelete}/>
        </Layout>
    );
}

export default TodayTasks;
