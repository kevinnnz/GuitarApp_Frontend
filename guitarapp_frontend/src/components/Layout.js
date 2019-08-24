import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./Navigation/Navigation"

import Dashboard from "../layouts/Signed-in/Dashboard";
import GuitarForm from "./GuitarForm/GuitarForm";
import GuitarDetails from "./GuitarDetails/GuitarDetails";
import ServiceForm from "./ServiceForm/ServiceForm";

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navigation />
                    <div className="container-fluid"> 
                        <Route path="/" component={Dashboard} exact />
                        <Route path="/add/guitar" component={GuitarForm} />
                        <Route path="/guitar/:id" component={GuitarDetails} />
                        <Route path="/service/:id" component={ServiceForm} />
                    </div>
               </Router>
            </div>
        );
    }
}