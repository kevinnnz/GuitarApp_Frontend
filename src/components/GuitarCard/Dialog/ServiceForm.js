import React, { Fragment } from 'react';
import moment from 'moment'; 
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { DialogActions, FormHelperText } from '@material-ui/core';

const initalState = {
    TechName: "",
    TechCompany: "",
    ServiceNotes: "",
    GuitarSetupDate: null,
    WorkDone: "Full setup",
    WorkDoneError: "",
    TechError: "",
    ServiceNotesError: "",
    GuitarSetupDateError: "",
    ServerErrors: "",
};

export class ServiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GuitarId: this.props.id,
            TechName: initalState.TechName,
            TechCompany: initalState.TechCompany,
            ServiceNotes: initalState.ServiceNotes,
            WorkDone : initalState.WorkDone,
            GuitarSetupDate: initalState.GuitarSetupDate,
            TechError: initalState.TechError,
            ServiceNotesError: initalState.ServiceNotesError,
            GuitarSetupDateError: initalState.GuitarSetupDateError,
            open : false
        };
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleDateChange = (event) => {
        var date = moment(event._d).format("YYYY-MM-DD");
        this.setState({
            GuitarSetupDate : date
        });
    }

    validateForm = () => {
        let TechError = "";
        let ServiceNotesError = "";
        let GuitarSetupDateError = "";

        if(!this.state.GuitarSetupDate) {
            GuitarSetupDateError = "Setup date cannot be blank.";
        }

        if(!this.state.TechName && !this.state.TechCompany) {
            TechError = "Tech name or tech company cannot be blank.";
        }

        if(!this.state.ServiceNotes) {
            ServiceNotesError = "Service note cannot be blank";
        }

        if(TechError) {
            this.setState({TechError, ServiceNotesError, GuitarSetupDateError});
            return false;
        }

        return true;
    }
    
    handleSubmit = (event) => {
        // function to handle submit to the apigateway
        event.preventDefault();
        const isValid = this.validateForm();
        
        if (isValid) {
            var serviceRecord = {
                "guitarId" : this.state.GuitarId,
                "date" : this.state.GuitarSetupDate,
                "techName" : this.state.TechName,
                "techCompany" : this.state.TechCompany,
                "workDone" : this.state.WorkDone,
                "notes" : this.state.ServiceNotes
            }
            var json = JSON.stringify(serviceRecord);
            // do something..
            fetch(`https://dev.kevinzaworski.com/api/service/${this.props.auth.uid}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + this.props.auth.stsTokenManager.accessToken
                },
                body: json,
            }).then(res => {
                if( res.status === 200) {
                    window.location.replace('/')
                } else {
                    this.setState({
                        ServerError : "Error: Something went wrong on the server end, please refresh and try again.."
                    })
                }
            }); 
        } 
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
            TechName: initalState.TechName,
            TechCompany: initalState.TechCompany,
            ServiceNotes: initalState.ServiceNotes,
            GuitarSetupDate: initalState.GuitarSetupDate,
            TechError: initalState.TechError,
            ServiceNotesError: initalState.ServiceNotesError,
            GuitarSetupDateError: initalState.GuitarSetupDateError,
            WorkDone: initalState.WorkDone
        });
    }

    render() {
        if( this.state.connectionError ) {
            return(<div></div> );
        }
        
        if( this.state.ServerError ) {
            return( 
                <div className="card">
                    <h2 className="guitarTitle">{ this.state.ServerError }</h2>
                </div>
            )
        }

        return (
            <Fragment>
                <Button color="primary" onClick={this.handleToggle}>
                    Add Service Record
                </Button>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Dialog open={this.state.open} fullWidth={true}>
                    <form>
                        <DialogTitle id="form-dialog-title">Add Service Record</DialogTitle> 
                        <DialogContent>

                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/DD/YYYY"
                                label = "Service Date"
                                name="GuitarSetupDate"
                                value={ this.state.GuitarSetupDate }
                                onChange = { e => this.handleDateChange(e) }
                            />
                            <FormHelperText>Example: 09/05/2019 </FormHelperText>
                            <br/>
                            <InputLabel htmlFor="workdone">Work Done</InputLabel>
                            <Select
                                id="workdone"
                                name="WorkDone"
                                value={ this.state.WorkDone }
                                onChange={ e => this.handleChange(e) }
                                fullWidth={ true }
                            >
                                <MenuItem name="WorkDone" value="Full setup">Full setup</MenuItem>
                                <MenuItem name="WorkDone" value="Half setup">Half setup</MenuItem>
                                <MenuItem name="WorkDone" value="String change">String change</MenuItem>
                                <MenuItem name="WorkDone" value="Neck adjustment">Neck adjustment</MenuItem>
                                <MenuItem name="WorkDone" value="Crown frets">Crown frets</MenuItem>
                                <MenuItem name="WorkDone" value="Neck adjustment">New frets</MenuItem>
                                <MenuItem name="WorkDone" value="Install new pickups">Install new pickups</MenuItem>
                            </Select>
                            <div className="formError"><p>{this.state.TechError}</p></div>
                            <TextField
                                label="Tech Name"
                                margin="dense"
                                name = "TechName"
                                value = { this.state.techName }
                                onChange = { e=> this.handleChange(e) }
                                fullWidth = { true }
                            />
                            <FormHelperText>Example: John Doe.</FormHelperText>
                            
                            <TextField
                                id="standard-dense"
                                label="Tech Company"
                                margin="dense"
                                name = "TechCompany"
                                value = { this.state.techCompany }
                                onChange = { e=> this.handleChange(e) }
                                fullWidth = { true }
                            />
                            <FormHelperText>Example: Cask Guitars</FormHelperText>
                            
                            <TextField
                                id="standard-dense"
                                label="Service Notes"
                                margin="dense"
                                name = "ServiceNotes"
                                value = { this.state.serviceNotes }
                                onChange = { e=> this.handleChange(e) }
                                fullWidth = { true }
                            />
                            <FormHelperText>Example: Changed strings, polished frets</FormHelperText>
                            <div className="formError"><p>{this.state.ServiceNotesError}</p></div>
                            <DialogActions>
                                <Button onClick={this.handleSubmit} color="primary">Submit</Button>
                                <Button onClick={this.handleToggle} color="secondary"> Cancel </Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </MuiPickersUtilsProvider> 
            </Fragment>
        );
    }
}


const mapStateToProps  = state => ({ 
    auth : state.firebase.auth
});

export default connect(mapStateToProps, {})(ServiceForm);