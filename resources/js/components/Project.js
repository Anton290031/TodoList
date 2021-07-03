import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TaskList from "./TaskList";

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState({tasks: []});

    const getTasks = () => axios.get("/api/project/" + id)
            .then((response) => setProject(response.data));

    useEffect(getTasks, id);

    const onCreate = (task) => {
        task.project_id = project.id;
        axios.post("/api/task", task)
            .then(getTasks);
    };

    const onUpdate = (taskId, task) => {
        axios.put("/api/task/" + taskId, task)
            .then(getTasks);
    };

    const onDelete = (taskId) => {
        axios.delete("/api/task/" + taskId)
            .then(response => {
                if (response.status == 200)
                    setProject({...project, tasks: project.tasks.filter((t) => t.id != taskId)});
            });
    };

    return (
        <>
        <TaskList tasks={project.tasks} onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete}/>
        </>
    );
}

export default Project;
