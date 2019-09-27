import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import GuitarForm from '../../components/GuitarForm/GuitarForm';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const style = {
    marginBottom : "100px"
};

export default function Navigation() {
    
    return(
        <div style={style}> 
            <AppBar>
                <Toolbar>
                    <Typography variant="h5" style={{flex: 1}}>Guitar App</Typography>
                    <GuitarForm/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
