import React from 'react';

import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

export default class GuitarHealth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted: false,
            noRecords: true
        }
    }

    componentDidMount() {
        this.calculateHealth();
    }

    calculateHealth() {
        let records = this.props.serviceRecords;
        if(records.length) {
            records.sort((a, b) =>  new Date(b.date) - new Date(a.date));
            this.setState({
                sorted: true,
                noRecords: false
            });
            // this.findFirstRecord();
        } 
    }

    findFirstSetupRecord() {
        
    }

    render() {
        if(this.state.noRecords === true) {
            return(
                <Badge variant="secondary">Not Availble</Badge>
            );
        } 
        return(
            <Badge variant="secondary">Not Availble</Badge>
        );
    }
}