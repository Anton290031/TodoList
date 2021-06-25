import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import {DeleteForever} from "@material-ui/icons";
import EditTask from "./EditTask";
import AddTask from "./AddTask";

const useStyles = makeStyles((theme) => ( {
    root: {
        margin: 'auto',
        width: '100%',
        maxWidth: 1000,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function TaskList({tasks, onCreate, onUpdate, onDelete}) {
    const classes = useStyles();
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [taskIndex, setTaskIndex] = useState(null);

    return (
        <>
            <AddTask
                open={isAddTaskOpen}
                onSubmit={(task) => {onCreate(task); setIsAddTaskOpen(false);}}
                onCancel={() => setIsAddTaskOpen(false)}
            />
            <EditTask
                open={taskIndex != null}
                onSubmit={(task) => {onUpdate(task.id, task); setTaskIndex(null);}}
                onCancel={() => setTaskIndex(null)}
                task={tasks[taskIndex]}
            />
            <List className={classes.root}>
                {tasks.map((task, index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={task.is_complete == 1}
                                    onInput={(event) => {
                                        onUpdate(task.id, {is_complete: !event.target.checked});
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={task.title} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => setTaskIndex(index)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(task.id)}>
                                    <DeleteForever/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
                <ListItem>
                    <Button onClick={() => setIsAddTaskOpen(true)}>Add task</Button>
                </ListItem>
            </List>
        </>
    );
}

export default TaskList;
