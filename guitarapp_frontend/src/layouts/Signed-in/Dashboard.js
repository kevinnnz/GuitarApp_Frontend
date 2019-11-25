import React from 'react';

import GuitarCard from '../../components/GuitarCard/GuitarCard';
import Navigation from '../../components/Navigation/Navigation';

import Container from '@material-ui/core/Container';

const Dashboard = () => {
    return (
        <div>
            <Navigation />
            <Container maxWidth="lg">
                <div>
                    <h1>Guitars</h1>
                    <p>Alpha build 0.11.25</p>
                </div>
                <GuitarCard />
            </Container>
        </div>
    )
}

export default Dashboard;