import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/authActions';

import Navigation from "./Navigation/Navigation"
import Container from "@material-ui/core/Container"

import Dashboard from "../layouts/Signed-in/Dashboard";
import Signup from "../layouts/Anon/Signup";
import Login from "./LoginForm/LoginForm";

import jwt from "jsonwebtoken";

export class Layout extends React.Component {

    componentDidMount() {
        this.checkAuth();
    }

    checkAuth = () => {
        // getting token
        let token = localStorage.getItem('token');
        if(!token) {
            return;
        } 
        
        let user = jwt.decode(token);
        this.props.setCurrentUser(user);
    }

    render() {
            return (
                <Router>
                    { this.props.user.isAuth &&
                        <Route path="/" component={ Dashboard } exact />
                    }
                    <Container maxWidth="md">
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                    </Container> 
               </Router>
            );

    }
}

Layout.propTypes = {
    setCurrentUser: PropTypes.func.isRequired,
}

const mapStateToProps  = state => ({ 
    user : state.user
});

export default connect(mapStateToProps, { setCurrentUser })(Layout);