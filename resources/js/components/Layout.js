import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Button, Collapse,
    Divider,
    Drawer, IconButton,
    List,
    ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import ProjectList from "./ProjectList";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

function Layout(props) {
    const classes = useStyles();
    const history = useHistory();
    const [projects, setProjects] = useState([{name: "123"}]);

    const getProjects = () => axios.get('/api/project').then((response) => setProjects(response.data));

    useEffect(getProjects, []);

    const onCreateProject = (project) => {
        axios.post('/api/project', project).then(getProjects);
    };

    const onLogout = () => {
      axios.post('/api/logout').then(() => window.location.href = '/');
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        TodoList
                    </Typography>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open>
                        <div className={classes.toolbar} />
                        <Divider />
                        <List>
                            <ListItem button key="Today" onClick={() => history.push("/today_tasks")}>
                                <ListItemText primary="Today" />
                            </ListItem>
                            <ListItem button key="Week" onClick={() => history.push("/week_tasks")}>
                                <ListItemText primary="Week" />
                            </ListItem>
                            <ListItem button key="Month" onClick={() => history.push("/month_tasks")}>
                                <ListItemText primary="Month" />
                            </ListItem>
                            <ListItem button key="Year" onClick={() => history.push("/year_tasks")}>
                                <ListItemText primary="Year" />
                            </ListItem>
                            <ListItem button key="All Tasks" onClick={() => history.push("/all_tasks")}>
                                <ListItemText primary="All Tasks" />
                            </ListItem>

                            <ProjectList projects={projects} onCreate={onCreateProject}/>
                        </List>
                    </Drawer>
            </nav>

            <main className={classes.content}>
                <Toolbar />
                {props.children}
            </main>
        </div>
    );
}

export default Layout;
