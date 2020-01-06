import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';


const initalState = {
    email: "", 
    emailError: "",
    emailErrorBool: false,
    password: "",
    passwordError: "",
    passwordErrorBool: false,
}

export class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = initalState;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }
   
    validateForm = () => {
        let emailError = "";
        let passwordError = "";
        
        if(!this.state.email) {
            emailError = "Email is required. ";
            this.setState({ nameErrorBool : true });
        }

        if(!this.state.password) {
            passwordError = "Password is required. ";
            this.setState({ passwordErrorBool : true });
        }
       
        if(emailError || passwordError ) {
            this.setState({ 
                emailError,
                passwordError
            });

            return false;
        }

        return true;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = this.validateForm();  

        if(isValid) {
            this.props.login(this.state.email, this.state.password);      
        }
    }
    
    render() {
        return(
            <Container>
                <Card style={{
                    marginTop: 25,
                    paddingTop: 10, 
                }} >
                    <Container>
                        <h1>Login</h1> 
                        <br />
                        { this.props.auth.authError ?
                            <Fade in="true"><Alert variant="danger">Username or password are incorrect</Alert></Fade>
                             : <></>
                        }
                        <Form.Label>Email</Form.Label>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Control
                                name = "email"
                                placeholder="Email"
                                type="email"
                                value={this.state.email}
                                onChange={e => this.handleChange(e) } 
                            />
                            <small>
                                { this.state.emailError }
                            </small>
                            <br />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name = "password"
                                placeholder="Password" 
                                type="password"
                                value={this.state.password}
                                onChange={e => this.handleChange(e) } 
                            />
                            <small>
                                { this.state.passwordError }
                            </small>
                            <br />
                            <br />
                            <Container>
                                <Row>
                                    <Col xs={6}>
                                        <Link to="/signup"><Button variant="link">Sign up instead</Button></Link>
                                    </Col>
                                    <Col xs={6} className="text-right">
                                        <Button variant="primary" type="submit">Login</Button>
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
        auth: state.auth,
        firebaseAuth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);