import React from 'react';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { login, setCurrentUser } from '../../actions/authActions';

import jwt from 'jsonwebtoken';

import { FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


const initalState = {
    email: "", 
    emailError: "",
    emailErrorBool: false,
    password: "",
    passwordError: "",
    passwordErrorBool: false
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
            let user = {
                "username" : this.state.username,
                "email" : this.state.email,
                "password" : this.state.password
            }

            var json = JSON.stringify(user);
            
            try {
                this.props.login(json);  
            } catch(err) {
                console.log(err);
            } finally {
                window.location.replace('/');
            }
        }
    }
    
    render() {
        return(
            <div className="card" >
                <h1>Login</h1> 
                <form>
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
                        { this.state.emailError }
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
                        { this.state.passwordError }
                    </FormHelperText>
                    <br />
                    <br />
                    <Grid container spacing={10} alignItems="baseline" justify="space-between" direction="row">
                        <Grid item md={8}>
                            <Typography><Link to="/signup">Sign up instead</Link></Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Button fullWidth={true} color="primary" variant="contained" onClick={this.handleSubmit}>Login</Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                </form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired
}

export default connect(null, { login, setCurrentUser })(LoginForm);