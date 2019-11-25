import React from 'react';

import Navigation from '../../components/Navigation/Navigation'
import Container from "@material-ui/core/Container"
import LoginForm from '../../components/LoginForm/LoginForm';

export default class Signup extends React.Component {
    render() {
        return(
            <>
                <Navigation />
                <Container maxWidth="md">
                    <LoginForm />
                </Container>
            </>
        );
    }
}