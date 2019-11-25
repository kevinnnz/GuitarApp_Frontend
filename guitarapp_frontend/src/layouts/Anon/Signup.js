import React from 'react';

import Navigation from '../../components/Navigation/Navigation'
import Container from "@material-ui/core/Container"
import Register from '../../components/Register/Register';

export default class Signup extends React.Component {
    render() {
        return(
            <>
                <Navigation />
                <Container maxWidth="md">
                    <Register />
                </Container>
            </>
        );
    }
}