import React, {useState} from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Button
} from "@material-ui/core";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

function AddTask({open, onSubmit, onCancel}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(1);
    const [deadline, setDeadline] = useState(new Date());

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Priority"
                    type="number"
                    fullWidth
                    onChange={(e) => setPriority(Number.parseInt(e.target.value))}
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
                        onClick={() => onSubmit({title, description, priority, deadline: deadline.toISOString()})}
                >
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTask;
