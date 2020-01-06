import React from 'react';
import { connect } from 'react-redux';


import Navigation from '../components/Navigation/Navigation'
import Dashboard from './Signed-in/Dashboard';
import Anon from './Anon/Anon';

const Main = ({ auth }) => {
    // checking if user is authenticated..
    // if they are we go to Dashboard, if not redirected to Sign-up
    return (
        <>
            <Navigation />
            <div>
                { !auth.isLoaded ? <div></div> : !auth.isEmpty ? <Dashboard /> : <Anon />}
            </div>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
}

export default connect(mapStateToProps)(Main);