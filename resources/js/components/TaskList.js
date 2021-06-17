import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
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

function TaskList({tasks, onDelete}) {
    const classes = useStyles();

    return (
            <List className={classes.root}>
                {tasks.map((task) => {
                    const labelId = `checkbox-list-label-${task.id}`;

                    return (
                        <ListItem key={task.id}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    defaultChecked={task.is_complete == 1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={task.title} />
                            <ListItemSecondaryAction onClick={() => onDelete(task.id)}>
                                <IconButton edge="end">
                                    <DeleteForever/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
    );
}

export default TaskList;
