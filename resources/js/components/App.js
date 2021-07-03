import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Register from './Register';
import Login from "./Login";
import Layout from "./Layout";
import TodayTasks from "./TodayTasks";
import WeekTasks from "./WeekTasks";
import MonthTasks from "./MonthTasks";
import YearTasks from "./YearTasks";
import AllTasks from "./AllTasks";

function App() {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('token') != null){
            axios.get('/api/user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then((response) => {
                if (response.status == 200){
                    setIsAuth(true);
                }
            }).catch(() => setIsAuth(false));
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
                    <Redirect to="/login" />
                </Switch>
            </Router>
        );

    if (isAuth)
        return (
            <Router>
                <Switch>
                    <Route path='/today_tasks' component={TodayTasks}/>
                    <Route path='/week_tasks' component={WeekTasks}/>
                    <Route path='/month_tasks' component={MonthTasks}/>
                    <Route path='/year_tasks' component={YearTasks}/>
                    <Route path='/all_tasks' component={AllTasks}/>
                </Switch>
            </Router>
        );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
