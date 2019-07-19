import React from 'react';
import { Link } from 'react-router-dom';

export default class GuitarDetails extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            loading: true,
            guitar : null,
            servicerecords : [],
            id: match.params.id,
            lastService: null,
            err: null
        }
    }
    
    componentDidMount() {
        this.setState({
            loading: false,
            guitar : this.props.location.state.guitar
        });
        this.fetchServiceRecords();
    }

    fetchServiceRecords = () => {
        fetch(`http://dev.kevinzaworski.com:8080/api/service/${this.state.id}/all`).then((res) => {
            if(res.status === 200) {
                return res.json();
            } 

            if( res.status === 404) {
                return res.json();
            }
        }).then((data) => {
            let reversedData = data.reverse();
            this.setState({
                servicerecords: reversedData,
            });
            this.getLastSetupDate(reversedData);
        }).catch(err => {
            this.setState({ 
                err: err,
            });
        });
    }

    getLastSetupDate = (serviceArr) => {
        let date = serviceArr[0].GuitarSetupDate.split('T')[0];

        this.setState({
            lastService: date
        })
    }

    render() {

        if( this.state.loading ){
            return (
                <div className="card">
                    <h1 className="guitarTitle">Loading...</h1>
                </div>
            );
        }

        if( !this.state.servicerecords && !this.state.servicerecords.length ){
            return(
                <div className="card">
                    <h1 className="guitarTitle">{ this.state.guitar.GuitarColour + ' ' +this.state.guitar.GuitarModel }</h1>
                    <p className="guitarDetails">{ this.state.guitar.GuitarYear + ' ' + this.state.guitar.GuitarSerial }</p>
                    <h3 className="center"> History </h3>
                    <p>No records found...</p> 
                </div>
            );
        }

        return(
            <div className="card">
                <h1 className="guitarTitle">{ this.state.guitar.GuitarColour + ' ' +this.state.guitar.GuitarModel }</h1>
                <p className="guitarDetails">{ this.state.guitar.GuitarYear + ' ' + this.state.guitar.GuitarSerial }</p>
                <h3 className="center"> Last Service Date </h3>
                <p className="guitarDetails">{ this.state.lastService }</p>

                <p className="guitarDetails"><Link to={{ pathname: `/service/${this.state.id}`, state:{ guitar: this.state.guitar } }} >Add New Service Record</Link></p>

                <h3 className="center"> History </h3>
                { this.state.servicerecords.map(servicerecord => {
                    return ServiceRecordTable(
                        servicerecord.Id, servicerecord.TechName, servicerecord.TechCompany, servicerecord.ServiceNotes
                    );
                })
                }
            </div>
        );

    }
}

const ServiceRecordTable = (Id, TechName, TechCompany, ServiceNotes) => {
    if(TechName === null || TechName === "") {
        TechName = "n/a";
    }

    if(TechCompany === null || TechCompany === "") {
        TechCompany = "n/a";
    }

    return(
        <div className="serviceHistory" key={Id}>
            <p><strong>Guitar Tech:</strong> {TechName}</p>
            <p><strong>Tech Company:</strong> {TechCompany}</p>
            <hr className="break" />
            <p><strong>Notes:</strong> { ServiceNotes }</p>
        </div>
    );
}