import React, { Fragment } from "react";
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { DialogActions, FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const initalState = {
    GuitarMake: "",
    GuitarModel: "",
    GuitarSerial: "",
    GuitarColour: "",
    GuitarYear: "",
    GuitarOwnerId: "dummyuser",
    GuitarMakeError: "",
    GuitarModelError: "",
    GuitarSerialError: "",
    GuitarColourError: "",
    GuitarYearError: "",
    open: false
};

export class GuitarForm extends React.Component {
    constructor() {
        super();
        this.state = initalState;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
            GuitarMake: "",
            GuitarModel: "",
            GuitarSerial: "",
            GuitarColour: "",
            GuitarYear: "",
            GuitarOwnerId: "dummyuser",
            GuitarMakeError: "",
            GuitarModelError: "",
            GuitarSerialError: "",
            GuitarColourError: "",
            GuitarYearError: ""
        });
    }

    validateForm = () => {
        let GuitarMakeError = "";
        let GuitarModelError = "";
        let GuitarSerialError = "";
        let GuitarColourError = "";
        let GuitarYearError = "";

        if(!this.state.GuitarMake) {
            GuitarMakeError = "Guitar Make cannot be blank!";
        }

        if(!this.state.GuitarModel) {
            GuitarModelError = "Guitar Model is required!";
        }

        if(!this.state.GuitarSerial) {
            GuitarSerialError = "Guitar Serial is required!";
        }

        if(!this.state.GuitarColour) {
            GuitarColourError = "Guitar Colour is required!";
        }

        if(!this.state.GuitarYear) {
            GuitarYearError = "Guitar Year is required!";
        }

        if(GuitarMakeError || GuitarModelError || GuitarSerialError || GuitarColourError || GuitarYearError) {
            this.setState({GuitarMakeError, GuitarModelError, GuitarSerialError, GuitarColourError, GuitarYearError});
            return false;
        }

        return true;
    }
    
    handleSubmit = (event) => {
        // function to handle submit to the apigateway
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            var guitar = {
                "guitarMake" : this.state.GuitarMake,
                "guitarModel" : this.state.GuitarModel,
                "guitarSerial" : this.state.GuitarSerial,
                "guitarColour" : this.state.GuitarColour,
                "guitarYear" : this.state.GuitarYear,
                "owner" : this.state.GuitarOwnerId,
            }
            
            var json = JSON.stringify(guitar);
            console.log(localStorage.getItem('token'));
            let url = `https://dev.kevinzaworski.com/api/guitar/${this.props.user.user._id}`;
            console.log(url);

            fetch(`https://dev.kevinzaworski.com/api/guitar/${this.props.user.user._id}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : 'Bearer ' + localStorage.getItem('token')
                },
                body: json,
            }).then(res => {
                console.log(res);
            });

            window.location.replace('/');
        }
    }

    render() {
        if( this.state.connectionError ) {
            return(<div></div> );
        }        

        return (
            <Fragment>
                <Fab color="secondary"  onClick={this.handleToggle}>
                   <AddIcon />
                </Fab>
                <Dialog open={this.state.open} fullWidth={true}>
                    <DialogContent>
                        <DialogTitle>
                            Add Gutiar
                        </DialogTitle>
                        <form>
                            <TextField
                                name = "GuitarMake"
                                placeholder="Guitar Make" 
                                value={this.state.GuitarMake} 
                                onChange={e => this.handleChange(e) } 
                                fullWidth={ true }
                            />
                            <FormHelperText>Example: Fender</FormHelperText>
                            <div className="formError"><p>{this.state.GuitarMakeError}</p></div>
                            <TextField 
                                name = "GuitarModel"
                                placeholder="Guitar Model" 
                                value={this.state.GuitarModel} 
                                onChange={e => this.handleChange(e) }
                                fullWidth={ true }
                            />
                            <FormHelperText>Example: Jazzmaster</FormHelperText>
                            <div className="formError"><p>{this.state.GuitarModelError}</p></div>
                            <TextField 
                                name = "GuitarSerial"
                                placeholder="Guitar Serial" 
                                value={this.state.GuitarSerial} 
                                onChange={e => this.handleChange(e) }
                                fullWidth={ true } 
                            />
                            <FormHelperText>Example: 0000001</FormHelperText>
                            <div className="formError"><p>{this.state.GuitarSerialError}</p></div>
                            <TextField 
                                name = "GuitarColour"
                                placeholder="Guitar Colour" 
                                value={this.state.GuitarColour} 
                                onChange={e => this.handleChange(e) }
                                fullWidth={ true }
                            />
                            <FormHelperText>Example: Olympic White</FormHelperText>
                            <div className="formError"><p>{this.state.GuitarColourError}</p></div>
                            <TextField
                                name = "GuitarYear"
                                placeholder="Guitar Year" 
                                value={this.state.GuitarYear} 
                                onChange={e => this.handleChange(e) }
                                fullWidth={ true } 
                            />
                            <FormHelperText>Example: 1992</FormHelperText>
                            <div className="formError"><p>{this.state.GuitarYearError}</p></div>
                            <DialogActions>
                                <Button onClick={this.handleSubmit} color="primary">Submit</Button>
                                <Button onClick={this.handleToggle} color="secondary">Cancel</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog> 
            </Fragment>
        );
    }
}


const mapStateToProps  = state => ({ 
    user : state.user
});

export default connect(mapStateToProps, {})(GuitarForm);