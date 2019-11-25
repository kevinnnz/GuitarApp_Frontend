import React from 'react';
import { connect } from 'react-redux';

import Dashboard from './Signed-in/Dashboard';
import Signup from './Anon/Signup';

const Main = ({ auth }) => {
    // checking if user is authenticated..
    // if they are we go to Dashboard, if not redirected to Sign-up
    return (
        <>
            { !auth.isLoaded ? <div></div> : !auth.isEmpty ? <Dashboard /> : <Signup />}
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
}

export default connect(mapStateToProps)(Main);