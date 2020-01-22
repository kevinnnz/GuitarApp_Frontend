import React from 'react';

import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

export default class GuitarHealth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted : false,
            hasRecords : false,
            firstRecord : 0
        }
    }

    componentDidMount() {
        // sort the array
        let records = this.props.serviceRecords;
        if(records.length) {
            records.sort((a, b) =>  new Date(b.date) - new Date(a.date));
            this.setState({
                sorted : true
            });
            this.findFirstRecord();
        }

        // do nothing if the array is empty 
    }

    findFirstRecord() {
        let recordFound = false;

        for (let i = 0; i < this.props.serviceRecords.length; i++) {
            const record = this.props.serviceRecords[i];

            if (record.workDone.toLowerCase() === "full setup" || record.workDone.toLowerCase() === "half setup") {
                // we just need the first record
                // only full setup, half setup effect playability
                recordFound = true;
                this.setState({ firstRecord : i });  
                break;  
            } 
        }

        if ( recordFound === true ) {
            this.setState({ hasRecords: true });
        } 
    }

    returnProgressBar(date) {
        // calculates the health of the guitar by subtracting todays date with last setup date
        // divide the result by 360 and multiple by 100 to get the percentage
        // generally speaking guitars need to be readjusted every year. 
        let todayDate = new Date();

        let lastSetupDate = date.toString().split("-");
        let lastSetupJsDate = new Date(lastSetupDate[0], lastSetupDate[1] - 1, lastSetupDate[2].substr(0,2));

        let today = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
        let setup = Date.UTC(lastSetupJsDate.getFullYear(), lastSetupJsDate.getMonth(), lastSetupJsDate.getDate());
        let percentage = 0;

        if(today === setup ) {
            percentage = 100;
        } else {
            // why does this work?
            let diff = Math.floor((today - setup) / (1000 * 60 * 60 * 24));
            diff = 360 - diff;
            percentage = Math.round((diff / 360) * 100);
        }

        if ( percentage <= 0 ) { 
            return(
                <Badge variant="danger">Poor</Badge>
            )
        } else if( percentage >= 51 && percentage <= 100 ) {
            return(
                <Badge variant="success">Good</Badge>
            )
        } else if( percentage >= 1 && percentage <= 50 ) {
            return(
                <Badge variant="warning">Ok</Badge>
            )
        }
    }

    render() {
        if ( this.state.sorted === true && this.state.hasRecords === true ) {
            return(
                this.returnProgressBar(this.props.serviceRecords[0].date)
            )
        } else {
            return(
                <Badge variant="secondary">Not Availble</Badge>
            );
        }  
    }
}