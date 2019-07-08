import React from "react";
const ApiGateway = "http://dev.kevinzaworski.com/api/guitars/dummyuser";

export default class GuitarCard extends React.Component {
    constructor() { 
        super();
        this.state = {
            err: null,
            loading: true,
            guitars: []
        };
    }

    componentDidMount() {
        // functions to call after the intial rendering
        this.fetchUsersGuitars();
        setInterval(this.fetchUsersGuitars, 30000);
    }

    fetchUsersGuitars = () => {
        fetch(ApiGateway).then((res) => { 
            if(res.status === 200) {
                return res.json();
            } 

            if( res.status === 404) {
                return res.json();
            }

            throw new Error('Something went wrong. Please try again shortly.');
         }).then((data) => {
            this.setState({
                guitars: data,
                loading: false,
            })
        }).catch(err => {
            this.setState({ 
                err: err,
                loading: false
            });
        });
    }

    render() {
        while( this.state.loading ) {
            return( <Loading /> );
        }
        
        if( this.state.err ) {
            if( this.state.err && this.state.guitars.length ){
                return (
                    <div>               
                        { this.state.guitars.map(guitar => (
                            <div className="card" key={guitar.Id}>
                                <h2 className="guitarTitle"> { guitar.GuitarColour + ' ' + guitar.GuitarModel } </h2> 
                                <p className="guitarDetails">{ guitar.GuitarYear + ' ' + guitar.GuitarSerial }</p>
                                <Playbility GuitarId = { guitar.Id }/>
                            </div>
                        ))} 
                    </div>
                );
            }
            return( <div className="card"><HasErrors err = { this.state.err } /></div> );
        }

        if( !this.state.guitars[0].Id && !this.state.err ) {
            return( <NoGuitarsFound /> );
        }

        return (
            <div>               
                { this.state.guitars.map(guitar => (
                    <div className="card" key={guitar.Id}>
                        <h2 className="guitarTitle"> { guitar.GuitarColour + ' ' + guitar.GuitarModel } </h2> 
                        <p className="guitarDetails">{ guitar.GuitarYear + ' ' + guitar.GuitarSerial }</p>
                        <Playbility GuitarId = { guitar.Id }/>
                    </div>
                ))} 
            </div>
        );
    }
}

class Playbility extends React.Component {
    constructor() {
        super();
        this.state = {
            service: [],
            loading: true,
            err: null
        }
    } 

    componentDidMount() {
        this.fetchServiceRecords();
        setInterval(this.fetchServiceRecords, 30000)
    }

    fetchServiceRecords = () => {
        fetch("http://dev.kevinzaworski.com/api/service/" + this.props.GuitarId + "/last").then((res) => {
            if(res.status === 200) {
                return res.json();
            } else if(res.status === 404 ) {
                return res.json();
            }
            throw new Error('Something went wrong. Please try again shortly.');
        })
        .then((data) => {
            this.setState({ 
                service: data,
                loading: false
            })
        }).catch(err => {
            this.setState({ 
                err: err,
                loading: false
            });
        });
    }

    calculateGuitarHealth = (date) => {
        // calculates the health of the guitar by subtracting todays date
        // with the last time the guitar got a setup. Generally a guitar
        // needs an setup every 6 - 12 months.
        let todayDate = this.yyyymmdd();
        let lastSetupDate = date.toString().replace(/-/g, "");
        let diff = lastSetupDate - todayDate;

        return(this.chartTheGuitarHealth(diff));
    }

    chartTheGuitarHealth = (diff) => {
        if(diff >= 365 && diff <= 273 ) {
            return( <p className="playability green">Great!</p> );
        } else if( diff >= 273 && diff <= 182 ) {
            return( <p className="playability green">Good</p> );
        } else if ( diff >= 91 && diff <= 181 ) {
            return( <p className="playability yellow">Okay</p> );
        } else if ( diff >= 0 && diff <= 90 ) {
            return( <p className="playability red">Needs an adjustment</p> );
        } else {
            return( <p className="playability red">Critical! Take guitar in for service!</p> );
        }
    }

    yyyymmdd = () => {
        var x = new Date();
        var y = x.getFullYear().toString();
        var m = (x.getMonth() + 1).toString();
        var d = x.getDate().toString();
        (d.length === 1) && (d = '0' + d);
        (m.length === 1) && (m = '0' + m);
        var yyyymmdd = y +  m + d;
        return yyyymmdd;
    }

    render() {
        if( this.state.loading ){
            return(<div></div>);
        }

        if( this.state.service === "Sorry, we cannot find that!" ) {
            return( <NoServiceRecordsFound /> );
        } else if( this.state.err) {
            return( <HasErrors err = {this.state.err} />)
        }

        return(
            <div>
                <h3 className="center">Playbility</h3>
                { }
                { this.calculateGuitarHealth(this.state.service.map(servicerecord => (
                        servicerecord.GuitarSetupDate.split('T')[0]))) }
            </div> 
        );
    }   
}

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


