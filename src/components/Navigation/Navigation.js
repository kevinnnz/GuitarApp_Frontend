import React from 'react';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import AuthUserNavigation from '../AuthUserNavigation/AuthUserNavigation';

const Navigation = ({ auth }) => {   
    return(
        <Navbar className="justify-content-between" variant="dark" bg="dark">
            <Navbar.Brand href="/">Guitar App</Navbar.Brand>
            <div className="float-right">
                <Form inline>
                    { !auth.isEmpty ? <AuthUserNavigation /> : <></> }
                </Form>
            </div>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
} 

export default connect(mapStateToProps)(Navigation)