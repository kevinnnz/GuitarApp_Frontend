import React from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import AuthUserNavigation from '../AuthUserNavigation/AuthUserNavigation'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const style = {
    marginBottom : "100px"
};


const Navigation = ({ auth }) => {   
    return(
        <div style={style}> 
            <AppBar>
                    <Toolbar>
                        <Typography variant="h5" style={{flex: 1}}>Guitar App</Typography>
                        { !auth.isEmpty ? <AuthUserNavigation /> : <></> }
                    </Toolbar> 
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
} 

export default connect(mapStateToProps)(Navigation)