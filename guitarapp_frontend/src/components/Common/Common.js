import React from 'react';
import Paper from '@material-ui/core/Paper';

const HasErrors = (props) => {
    return (
        <h2 className="guitarTitle"> { props.err.toString() } </h2> 
    );
}

const Loading = () => {
    return(
        <div className="card">
            <h2 className="guitarTitle">loading...</h2> 
        </div> 
    );
}

const NoGuitarsFound = () => {
    return(
        <div className="card">
            <h2 className="guitarTitle">No guitars yet...</h2> 
        </div> 
    );
}

const Success = () => {
    return (
        <div className="card">
            <h2 className="guitarTitle">Success, redirecting home...</h2>
        </div>
    );
}

const Err500 = () => {
    return (
        <Paper className="error">
            <p>Something went wrong, please try again later!</p>
        </Paper>
    );
}

const ErrExists = () => {
    return (
        <Paper className="error">
            <p>Username or Email is taken. Please try again.</p>
        </Paper>
    );
}

export {
    HasErrors,
    Loading,
    NoGuitarsFound,
    Success,
    Err500,
    ErrExists
}