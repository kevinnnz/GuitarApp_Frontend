import React from 'react';

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
    )
}

export {
    HasErrors,
    Loading,
    NoGuitarsFound,
    Success
}