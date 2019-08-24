import React from 'react';
import GuitarCard from '../../components/GuitarCard/GuitarCard';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <GuitarCard />
                </div>
            </div>
        )
    }
}