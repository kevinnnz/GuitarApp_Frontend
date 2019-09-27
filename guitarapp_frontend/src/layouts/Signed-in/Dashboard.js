import React from 'react';
import GuitarCard from '../../components/GuitarCard/GuitarCard';
import Navigation from '../../components/Navigation/Navigation';

import Container from '@material-ui/core/Container';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
            <Navigation />
            <Container maxWidth="lg">
                <div>
                    <h1>Guitars</h1>
                </div>
                <GuitarCard />
            </Container>
            </div>
        )
    }
}