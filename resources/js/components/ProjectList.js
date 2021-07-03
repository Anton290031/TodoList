import React, {useState} from 'react';
import {
    Button,
    Checkbox, Collapse,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";
import {DeleteForever, ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import {useHistory} from "react-router-dom";
import ProjectForm from "./ProjectForm";

function ProjectList({projects, onCreate, onUpdate, onDelete}) {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [addProjectOpen, setAddProjectOpen] = useState(false);

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
                    {projects.map((project) => (
                        <ListItem button onClick={() => history.push("/project/" + project.id)}>
                            <ListItemText primary={project.name} />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <ProjectForm
                open={addProjectOpen}
                onSubmit={(project) => { onCreate(project); setAddProjectOpen(false);}}
                onCancel={() => setAddProjectOpen(false)}
            />
        </>
    );
}

export default ProjectList;
