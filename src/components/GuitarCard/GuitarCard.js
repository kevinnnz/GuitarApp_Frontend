import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGuitars } from '../../store/actions/guitarAcions';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import ServiceForm from '../GuitarCard/Dialog/ServiceForm';


// 1.1 GUITAR CARD
export class GuitarCard extends React.Component {
    componentDidMount() {
        // pass in the firebase UserId and accessToken
        this.props.fetchGuitars(this.props.auth.uid, this.props.auth.stsTokenManager.accessToken);
    }
    
    render() {
        if(this.props.guitars.length === 0) {
            return(
                <div className="card">
                     <h2 className="guitarTitle">No Guitars Found</h2>
                     <p>Please add a guitar to your collection...</p>
                </div>
            )
        } else {
            return (
                this.props.guitars.map(guitar => (
                    <div className="card" key={guitar._id}>
                        <Grid container direction="row" spacing={10}>
                            <Grid item sm={7} md={8} lg={9}>
                                <h2 className="guitarTitle">{ guitar.guitarColour + ' ' + guitar.guitarModel }</h2> 
                                <p className="guitarDetails">{ guitar.guitarYear + ' ' + guitar.guitarSerial }</p>
                                <ServiceForm id={guitar._id}/>
                            </Grid>
                            <Grid item sm={5} md={4} lg={3} >
                                <Playability servicerecords={guitar.serviceRecords} />
                            </Grid> 
                        </Grid>
                        <Grid container direction="row" spacing={1}>
                            <Grid item sm={7} md={8} lg={9}>
                                <h3>Service Records</h3> 
                            </Grid>
                        </Grid>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Tech Name</TableCell>
                                    <TableCell>Tech Company</TableCell>
                                    <TableCell>Work Done</TableCell>
                                    <TableCell>Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { guitar.serviceRecords.map(service => (
                                    <TableRow key={ service.date }>
                                        <TableCell>{ service.date }</TableCell>
                                        <TableCell>{ service.techName }</TableCell>
                                        <TableCell>{ service.techCompany }</TableCell>
                                        <TableCell>{ service.workDone }</TableCell>
                                        <TableCell>{ service.notes }</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )) 
            );
        }
    }
}

export class Playability extends React.Component {
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
        let records = this.props.servicerecords;
        if(records.length) {
            records.sort((a, b) =>  new Date(b.date) - new Date(a.date));
            this.setState({sorted : true});
            this.findFirstRecord();
        }

        // do nothing if the array is empty
    }    

    findFirstRecord = () => {
        let recordFound = false;

        for (let i = 0; i < this.props.servicerecords.length; i++) {
            const record = this.props.servicerecords[i];

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

    returnGuitarProgressBar = (date) => {
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
            percentage = 0;
            return (
                <CircularProgressbar 
                    counterClockwise="true"
                    value={percentage} 
                    text={`${percentage}%`}
                    styles={{ 
                        root: {
                            width: "126px",
                            height: "126px",
                            display: "block",
                            margin: "auto",
                            bottom: "15px"
                        },
                        path: {
                            stroke: "#E85A5A"
                        },
                        text: {
                            fill: "#E85A5A"
                        }
                    }}
                />
            );
        }

        if( percentage >= 61 && percentage <= 100 ) {
            return (
                <CircularProgressbar 
                    counterClockwise="true"
                    value={percentage} 
                    text={`${percentage}%`}
                    styles={{ 
                        root: {
                            width: "126px",
                            height: "126px",
                            display: "block",
                            margin: "auto",
                            bottom: "15px"
                        },
                        path: {
                            stroke: "#89C87A"
                        },
                        text: {
                            fill: "#89C87A"
                        }
                    }}
                />
            );
        }

        if( percentage >= 36 && percentage <= 61 ) {
            return (
                <CircularProgressbar 
                    counterClockwise="true"
                    value={percentage} 
                    text={`${percentage}%`}
                    styles={{ 
                        root: {
                            width: "126px",
                            height: "126px",
                            display: "block",
                            margin: "auto",
                            bottom: "15px"
                        },
                        path: {
                            stroke: "#FEC73B"
                        },
                        text: {
                            fill: "#FEC73B"
                        }
                    }}
                />
            );
        }

        if( percentage >= 1 && percentage <= 35 ) {
            return (
                <CircularProgressbar 
                    counterClockwise="true"
                    value={percentage} 
                    text={`${percentage}%`}
                    styles={{ 
                        root: {
                            width: "126px",
                            height: "126px",
                            display: "block",
                            margin: "auto",
                            bottom: "15px"
                        },
                        path: {
                            stroke: "#E85A5A"
                        },
                        text: {
                            fill: "#E85A5A"
                        }
                    }}
                />
            );
        }
        
    }

    render() {
        if ( this.state.sorted === true && this.state.hasRecords === true ) {
            return(
                <div style={{
                    marginBottom: "15px"
                }}>
                    <h3 className="center">Playability</h3>
                        { this.returnGuitarProgressBar(this.props.servicerecords[0].date) }
                </div> 
            );
        }

        if ( this.state.hasRecords === false ) {
            return(
                <div style={{
                    marginBottom: "15px"
                }}>
                    <h3 className="center">Playability</h3>
                    <CircularProgressbar 
                    counterClockwise="true"
                    value={ 0 } 
                    text={`0%`}
                    styles={{ 
                        root: {
                            width: "126px",
                            height: "126px",
                            display: "block",
                            margin: "auto",
                            bottom: "15px"
                        },
                        path: {
                            stroke: "#E85A5A"
                        },
                        text: {
                            fill: "#E85A5A"
                        }
                    }}
                />
                </div> 
            );
        }
        
    }   
}

GuitarCard.propTypes = {
    fetchGuitars: PropTypes.func.isRequired,
    guitars: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    guitars: state.guitars.guitars,
    auth: state.firebase.auth
});

export default connect(mapStateToProps, { fetchGuitars })(GuitarCard);
