import React, {useState} from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Button
} from "@material-ui/core";
import 'date-fns';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function EditTask({open, onCancel, onSubmit, task}) {
    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [priority, setPriority] = useState(task?.priority);
    const [deadline, setDeadline] = useState(new Date());

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    defaultValue={task?.title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="title"
                    label="Description"
                    type="text"
                    defaultValue={task?.description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="standard-number"
                    label="Priority"
                    type="number"
                    defaultValue={task?.priority}
                    onChange={(e) => setPriority(Number.parseInt(e.target.value))}
                    fullWidth
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        margin="normal"
                        value={deadline}
                        onChange={setDeadline}
                        label="Deadline"
                        onError={console.log}
                        minDate={new Date()}
                        format="yyyy/MM/dd hh:mm a"
                    />
                </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button color="primary"
                        onClick={() => onSubmit({...task, title, description, priority, deadline: deadline.toISOString()})}
                >
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditTask;
