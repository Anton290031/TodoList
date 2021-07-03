import React, {useState} from 'react';
import {
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";
import {DeleteForever, ExpandLess, ExpandMore} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import {useHistory} from "react-router-dom";
import ProjectForm from "./ProjectForm";
import EditIcon from "@material-ui/icons/Edit";

function ProjectList({projects, onCreate, onUpdate, onDelete}) {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [projectIndex, setProjectIndex] = useState(null);

    return (
        <>
            <ListItem button onClick={() => setOpen(!open)}>
                <ListItemIcon>
                    {open ? <ExpandLess /> : <ExpandMore/>}
                </ListItemIcon>
                <ListItemText primary="Projects" />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="add" onClick={() => setAddProjectOpen(true)}>
                        <AddIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {projects.map((project, index) => (
                        <ListItem
                            key={project.id}
                            button
                            onClick={() => history.push("/project/" + project.id)}>
                            <ListItemText primary={project.name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="add" onClick={() => setProjectIndex(index)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="add" onClick={() => onDelete(project.id)}>
                                    <DeleteForever />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <ProjectForm
                open={addProjectOpen}
                onSubmit={(project) => { onCreate(project); setAddProjectOpen(false);}}
                onCancel={() => setAddProjectOpen(false)}
            />
            <ProjectForm
                open={projectIndex != null}
                onSubmit={(project) => { onUpdate(projects[projectIndex].id, project); setProjectIndex(null);}}
                onCancel={() => setProjectIndex(null)}
                project={projects[projectIndex]}
            />
        </>
    );
}

export default ProjectList;
