import React, { Fragment } from 'react';
import moment from 'moment'; 
import { connect } from 'react-redux';

import MomentUtils from '@date-io/moment';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


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
            GuitarId: "",
            TechName: initalState.TechName,
            TechCompany: initalState.TechCompany,
            ServiceNotes: initalState.ServiceNotes,
            WorkDone : initalState.WorkDone,
            GuitarSetupDate: initalState.GuitarSetupDate,
            TechError: initalState.TechError,
            ServiceNotesError: initalState.ServiceNotesError,
            GuitarSetupDateError: initalState.GuitarSetupDateError,
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        this.setState({
            GuitarId : this.props.id
        });
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleDateChange = (event) => {
        this.setState({
            GuitarSetupDate : event.target.value
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
                this.props.onHide();
            }).catch(error => {
                return "Error: Something went wrong. Please try again later."
            }); 
        } 
    }

    render() {
        if( this.state.ServerError ) {
            return( 
                <div className="card">
                    <h2 className="guitarTitle">{ this.state.ServerError }</h2>
                </div>
            )
        }

        return (
            <Modal
                {...this.props}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Service Record
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="date"
                            name="GuitarSetupDate"
                            onChange = { e => this.handleChange(e) }
                        />
                        <small className="form-text text-muted">Example: 09/05/2019 </small>
                        <br/>
                        <Form.Control as="select"
                            name="WorkDone"
                            value={ this.state.WorkDone }
                            onChange={ e => this.handleChange(e) }
                        >
                            <option value="Full setup">Full setup</option>
                            <option value="Half setup">Half setup</option>
                            <option value="String change">String change</option>
                            <option value="Neck adjustment">Neck adjustment</option>
                            <option value="Crown frets">Crown frets</option>
                            <option value="Neck adjustment">New frets</option>
                            <option value="Install new pickups">Install new pickups</option>
                        </Form.Control>
                        <div className="formError"><p>{this.state.TechError}</p></div>
                        <Form.Control
                            label="Tech Name"
                            name = "TechName"
                            value = { this.state.techName }
                            onChange = { e=> this.handleChange(e) }
                        />
                        <small className="form-text text-muted">Example: John Doe.</small>
                        <Form.Control
                            label="Tech Company"
                            name = "TechCompany"
                            value = { this.state.techCompany }
                            onChange = { e=> this.handleChange(e) }
                        />
                        <small className="form-text text-muted">Example: Cask Guitars</small>
                        <Form.Control
                            name = "ServiceNotes"
                            value = { this.state.serviceNotes }
                            onChange = { e=> this.handleChange(e) }
                            
                        />
                        <small className="form-text text-muted">Example: Changed strings, polished frets</small>
                        <div className="formError"><p>{this.state.ServiceNotesError}</p></div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
                            <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}


const mapStateToProps  = state => ({ 
    auth : state.firebase.auth
});

export default connect(mapStateToProps, {})(ServiceForm);