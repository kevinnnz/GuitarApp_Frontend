import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navigation from "./Navigation/Navigation"

import GuitarCard from "./GuitarCard/GuitarCard";
import GuitarForm from "./GuitarForm/GuitarForm";

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Navigation />
                    <Route path="/" component={GuitarCard} exact />
                    <Route path="/add/guitar" component={GuitarForm} />
                </BrowserRouter>
            </div>
        );
    }
}