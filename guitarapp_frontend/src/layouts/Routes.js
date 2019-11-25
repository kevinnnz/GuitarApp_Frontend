import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// UI
import Main from "./Main";
import Signup from "./Anon/Signup";
import Login from "./Anon/Login";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Main } />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter> 
    );
}

export default Routes;