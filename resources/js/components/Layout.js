import React from 'react';
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    List,
    ListItem, ListItemText,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
    toolbar: theme.mixins.toolbar,
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
}));

function Layout(props) {
    const classes = useStyles();

    const onLogout = () => {
      axios.post('/api/logout', null, {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              Accept: "application/json",
          }
      }).then(() => window.location.href = '/');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
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
                            {['Today', 'All Tasks'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['Projects'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
            </nav>

            <main className="py-4">
                {props.children}
            </main>
        </div>
    );
}

export default Layout;
