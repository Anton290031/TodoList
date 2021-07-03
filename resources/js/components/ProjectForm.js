import React, {useState} from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Button
} from "@material-ui/core";
import 'date-fns';

function ProjectForm({open, onSubmit, onCancel, project}) {
    const [name, setName] = useState(project?.name ?? "");

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button color="primary"
                        onClick={() => onSubmit({name})}
                >
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProjectForm;
