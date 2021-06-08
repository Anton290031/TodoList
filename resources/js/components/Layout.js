import React from 'react';
import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
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
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        TodoList
                    </Typography>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <main className="py-4">
                {props.children}
            </main>
        </>
    );
}

export default Layout;
