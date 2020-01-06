import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// UI
import Navigation from "../components/Navigation/Na";
import Main from "./Main";


const Routes = () => {
    return (
        <>
            <Navigation />
            <Main /> 
        </>
    );
}

export default Routes;