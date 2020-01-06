import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginForm} />
                    <Route path="/signup" component={RegisterForm} />
                </Switch>
            </Router> 
        </>
    )
}

export default Dashboard;