import React from 'react';

const NoServiceRecordsFound = () => {
    return (
        <p>Please add a service record to check the health of the guitar..</p>
    );
}

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

export {
    NoServiceRecordsFound,
    HasErrors,
    Loading,
    NoGuitarsFound
}