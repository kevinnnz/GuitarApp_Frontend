import React from "react";
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';

import GuitarForm from '../GuitarForm/GuitarForm';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button'

export class Profile extends React.Component {
    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <>
                <Button style={{ flex: 0.10}} color="inherit" onClick={this.logout}>Sign-Out</Button>
                <GuitarForm/>
            </>
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