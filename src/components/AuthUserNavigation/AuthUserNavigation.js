import React from "react";
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';

import Button from 'react-bootstrap/Button';

export class Profile extends React.Component {
    logout = () => {
        this.props.logout();
        window.location.replace('/');
    }

    render() {
        return (
            <Button className="btn btn-outline-success my-2 my-sm-0" variant="outline-info" onClick={this.logout}>Sign-Out</Button>
        );
    }
}


const mapStateToProps  = state => ({ 
    auth : state.firebase.auth
});

const mapDispatchToProps = (dispatch) => {
    return { logout : () => dispatch(logout()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);