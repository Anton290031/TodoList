import React, {useEffect, useState} from 'react';
import Layout from "./Layout";
import TaskList from "./TaskList";

function TodayTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("/api/task/today")
            .then((response) => setTasks(response.data));
    },[]);

    return (
        <Layout>
            <TaskList tasks={tasks}/>
        </Layout>
    );
}

export default TodayTasks;
