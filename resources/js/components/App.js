import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Register from './Register';
import Login from "./Login";
import Layout from "./Layout";
import TaskList from "./TaskList";
import TodayTasks from "./TodayTasks";

function App() {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        console.log(localStorage.getItem('token') != null);
        if(localStorage.getItem('token') != null){
            axios.get('/api/user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then((response) => {
                if (response.status == 200){
                    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                    setIsAuth(true);
                }
            }).catch((response) => {
                localStorage.removeItem('token');
                setIsAuth(false);
            });
        } else {
            setIsAuth(false);
        }
    }, []);

    if (isAuth == null)
        return "Loading...";

    if (!isAuth)
        return (
            <Router>
                <Switch>
                    <Route path='/login' render={() => <Login onLogin={setIsAuth}/>}/>
                    <Route path='/register' render={() => <Register onRegister={setIsAuth}/>}/>
                </Switch>
            </Router>
        );

    if (isAuth)
        return (
            <Router>
                <Switch>
                    <Route path='/today_tasks' component={TodayTasks}/>
                    <Route path='/' component={Layout}/>
                </Switch>
            </Router>
        );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
