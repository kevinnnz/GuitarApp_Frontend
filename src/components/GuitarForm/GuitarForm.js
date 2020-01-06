import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGuitars } from '../../store/actions/guitarAcions';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const initalState = {
    GuitarMake: "",
    GuitarModel: "",
    GuitarSerial: "",
    GuitarColour: "",
    GuitarYear: "",
    GuitarOwnerId: "",
    GuitarMakeError: "",
    GuitarModelError: "",
    GuitarSerialError: "",
    GuitarColourError: "",
    GuitarYearError: "",
    open: false
};

export class GuitarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = initalState;
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
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
            GuitarOwnerId: "",
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
        } else if (this.state.GuitarYear.length !== 4) {
            GuitarYearError = "Guitar Year format incorrect. Year must be in YYYY format."
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
                "guitarMake" : this.state.GuitarMake.toLowerCase(),
                "guitarModel" : this.state.GuitarModel.toLowerCase(),
                "guitarSerial" : this.state.GuitarSerial.toLowerCase(),
                "guitarColour" : this.state.GuitarColour.toLowerCase(),
                "guitarYear" : this.state.GuitarYear.toLowerCase(),
                "owner" : this.state.GuitarOwnerId.toLowerCase(),
            }
            
            var json = JSON.stringify(guitar);
            fetch(`https://dev.kevinzaworski.com/api/guitar/${this.props.auth.uid}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + this.props.auth.stsTokenManager.accessToken
                },
                body: json,
            }).then(res => {
                this.props.fetchGuitars(this.props.auth.uid, this.props.auth.stsTokenManager.accessToken);
            }).catch(err => {
                alert("Something went wrong, please reload and try again.");
            });
            this.handleToggle();
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Guitar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            name = "GuitarMake"
                            placeholder="Guitar Make" 
                            value={this.state.GuitarMake} 
                            onChange={e => this.handleChange(e) } 
                            type="text"
                        />
                        <small className="form-text text-muted">Example: Fender</small>
                        <div className="formError"><p>{this.state.GuitarMakeError}</p></div>
                        <Form.Control 
                            name = "GuitarModel"
                            placeholder="Guitar Model" 
                            value={this.state.GuitarModel} 
                            onChange={e => this.handleChange(e) }
                            type="text"
                        />
                        <small className="form-text text-muted">Example: Jazzmaster</small>
                        <div className="formError"><p>{this.state.GuitarModelError}</p></div>
                        <Form.Control 
                            name = "GuitarSerial"
                            placeholder="Guitar Serial" 
                            value={this.state.GuitarSerial} 
                            onChange={e => this.handleChange(e) }
                            type="text"
                        />
                        <small className="form-text text-muted">Example: 0000001</small>
                        <div className="formError"><p>{this.state.GuitarSerialError}</p></div>
                        <Form.Control 
                            name = "GuitarColour"
                            placeholder="Guitar Colour" 
                            value={this.state.GuitarColour} 
                            onChange={e => this.handleChange(e) }
                            type="text"
                        />
                        <small className="form-text text-muted">Example: Olympic White</small>
                        <div className="formError"><p>{this.state.GuitarColourError}</p></div>
                        <Form.Control
                            name = "GuitarYear"
                            placeholder="Guitar Year" 
                            value={this.state.GuitarYear} 
                            onChange={e => this.handleChange(e) }
                            type="text" 
                        />
                        <small className="form-text text-muted">Example: 1992</small>
                        <div className="formError"><p>{this.state.GuitarYearError}</p></div>
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


GuitarForm.propTypes = {
    fetchGuitars: PropTypes.func.isRequired,
    guitars: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    guitars: state.guitars.guitars,
    auth: state.firebase.auth
});

export default connect(mapStateToProps, { fetchGuitars })(GuitarForm);