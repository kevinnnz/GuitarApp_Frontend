import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./Navigation/Navigation"

import GuitarCard from "./GuitarCard/GuitarCard";
import GuitarForm from "./GuitarForm/GuitarForm";
import GuitarDetails from "./GuitarDetails/GuitarDetails";
import ServiceForm from "./ServiceForm/ServiceForm";

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navigation />
                    <Route path="/" component={GuitarCard} exact />
                    <Route path="/add/guitar" component={GuitarForm} />
                    <Route path="/guitar/:id" component={GuitarDetails} />
                    <Route path="/service/:id" component={ServiceForm} />
               </Router>
            </div>
        );
    }
}