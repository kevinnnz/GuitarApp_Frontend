import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../store/actions/authActions';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

const initalState = {
    exists: false,
    name: "",
    nameError: "",
    nameErrorBool: false,
    email: "",
    emailError: "",
    emailErrorBool: false,
    password: "",
    confPassword: "",
    passwordErrorBool: false
}

export class RegisterForm extends React.Component {

    constructor() {
        super();
        this.state = initalState;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    validateEmail = () => {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.email.match(mailformat)) return true;
        return false; 
    }
    
    
    validateForm = () => {
        let emailError = "";
        let passwordMatchError = "";
        let passwordLengthError = "";
        
        if(!this.state.email) {
            emailError = "Email is required. ";
            this.setState({ emailErrorBool : true });
        }

        if(!emailError) {
            if(!this.validateEmail()) {
                emailError = "Please enter a valid email. ";
                this.setState({ emailErrorBool : true });
            }
        }

        if(this.state.password !== this.state.confPassword) {
            passwordMatchError = "Passwords do not match. ";
            this.setState({ passwordErrorBool : true });
        }

        
        if(emailError || passwordMatchError || passwordLengthError ) {
            this.setState({ 
                emailError,
                passwordMatchError,
                passwordLengthError
            });
            return false;
        }

        return true;
    }

    handleSignup = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();   

        if(isValid) {
            this.props.signup(this.state.email, this.state.password);
        }
    }
    
    render() {
            return(
                <Container>
                    <Card style={{
                        marginTop: 25,
                        paddingTop: 10, 
                    }}>
                        <Container>
                            <h1>Register</h1> 
                            <br />
                            <Form onSubmit={this.handleSignup}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                    name = "email"
                                    placeholder="Email"
                                    type="email"
                                    value={this.state.email}
                                    error={ this.state.emailErrorBool } 
                                    onChange={e => this.handleChange(e) } 
                                />
                                <small className="form-text text-muted" error={ this.state.emailErrorBool }>
                                    { this.state.emailError } Example: bob@thebuilder.com
                                </small>
                                <br />
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    placeholder="Password" 
                                    type="password"
                                    value={this.state.password}
                                    error={ this.state.passwordErrorBool }
                                    onChange={e => this.handleChange(e) } 
                                />
                                <small className="form-text text-muted" error={ this.state.passwordErrorBool }>
                                    { this.state.passwordMatchError } Passwords must be between 8 - 15 characters. Letters and numbers only.
                                </small>
                                <br />
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    name = "confPassword"
                                    placeholder="Confirm Password" 
                                    type="password"
                                    value={ this.state.confPassword } 
                                    error={ this.state.passwordErrorBool }
                                    onChange={e => this.handleChange(e) } 
                                />
                                <br />
                                <br />
                            <Container>
                                <Row>
                                    <Col xs={6} className="text-left">
                                        <Link to="/" ><Button variant="link">Sign in instead</Button></Link>
                                    </Col>
                                    <Col xs={6} className="text-right">
                                        <Button variant="primary" type="submit" >Register</Button>
                                    </Col>
                                </Row> 
                            </Container>
                            <br />
                            <br />
                        </Form>
                        </Container>
                    </Card>
                </Container>
            );
        }
    }

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup : (email, password) => dispatch(signup(email, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);