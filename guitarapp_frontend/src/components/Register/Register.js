import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/authActions';

import { FormHelperText, Typography } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

export class Register extends React.Component {

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
        let nameError = "";
        let emailError = "";
        let passwordMatchError = "";
        let passwordLengthError = "";
        
        if(!this.state.name) {
            nameError = "Name is required. ";
            this.setState({ nameErrorBool : true });
        }

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

        
        if(nameError || emailError || passwordMatchError || passwordLengthError ) {
            this.setState({ 
                nameError,
                emailError,
                passwordMatchError,
                passwordLengthError
            });
            return false;
        }

        return true;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();   

        if(isValid) {
            let user = {
                "username" : this.state.username,
                "email" : this.state.email,
                "password" : this.state.password
            }

            var json = JSON.stringify(user);

            fetch('https://dev.kevinzaworski.com/api/user/register', {
                method: 'POST',
                body: json,
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(res => {
                    window.location.replace('/login');
            });
        }
    }
    
    render() {
        return(
            <div className="card" >
                <h1>Register</h1> 
                
                <form>
                    <TextField
                        name = "name"
                        required={true}
                        placeholder="Name" 
                        value={this.state.name} 
                        error={ this.state.nameErrorBool }
                        onChange={e => this.handleChange(e) } 
                        fullWidth={ true }
                    />
                    <FormHelperText error={ this.state.nameErrorBool }>
                        {this.state.nameError } Example: John Smith
                    </FormHelperText>
                    <br />
                    <TextField
                        name = "email"
                        placeholder="Email"
                        type="email"
                        value={this.state.email}
                        error={ this.state.emailErrorBool } 
                        onChange={e => this.handleChange(e) } 
                        fullWidth={ true }
                    />
                    <FormHelperText error={ this.state.emailErrorBool }>
                        { this.state.emailError } Example: bob@thebuilder.com
                    </FormHelperText>
                    <br />
                    <TextField
                        name = "password"
                        placeholder="password" 
                        type="password"
                        value={this.state.password}
                        error={ this.state.passwordErrorBool }
                        onChange={e => this.handleChange(e) } 
                        fullWidth={ true }
                    />
                    <FormHelperText error={ this.state.passwordErrorBool }>
                        { this.state.passwordMatchError } Passwords must be between 8 - 15 characters. Letters and numbers only.
                    </FormHelperText>
                    <br />
                    <TextField
                        name = "confPassword"
                        placeholder="Confirm Password" 
                        type="password"
                        value={ this.state.confPassword } 
                        error={ this.state.passwordErrorBool }
                        onChange={e => this.handleChange(e) } 
                        fullWidth={ true }
                    />
                    <br />
                    <br />
                    <Grid container spacing={10} alignItems="baseline" justify="space-between" direction="row">
                        <Grid item md={8}>
                            <Typography><Link to="/login" >Sign in instead</Link></Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Button fullWidth={true} color="primary" variant="contained" onClick={this.handleSubmit} >Register</Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    setCurrentUser: PropTypes.func.isRequired
}

export default connect(null, { setCurrentUser })(Register);