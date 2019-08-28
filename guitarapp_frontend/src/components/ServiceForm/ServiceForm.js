import React from "react";
import moment from "moment"; 

const initalState = {
    TechName: "",
    TechCompany: "",
    ServiceNotes: "",
    GuitarSetupDate: null,
    TechError: "",
    ServiceNotesError: "",
    GuitarSetupDateError: "",
    ServerErrors: ""
};

export default class ServiceForm extends React.Component {
    constructor({match}) {
        super();
        this.state = {
            GuitarId: match.params.id,
            TechName: initalState.TechName,
            TechCompany: initalState.TechCompany,
            ServiceNotes: initalState.ServiceNotes,
            GuitarSetupDate: initalState.GuitarSetupDate,
            TechError: initalState.TechError,
            ServiceNotesError: initalState.ServiceNotesError,
            GuitarSetupDateError: initalState.GuitarSetupDateError
        };
    }

    componentDidMount() {
        this.setState({
            Guitar : this.props.location.state.guitar,
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    changeTimeSignature(event) {
        let date = moment(new Date(event.target.value)).format("YYYY-MM-DD HH:mm:ss");
        this.setState({
            [event.target.name] : date
        });
    }

    validateForm = () => {
        let TechError = "";
        let ServiceNotesError = "";
        let GuitarSetupDateError = "";

        if(!this.state.GuitarSetupDate) {
            GuitarSetupDateError = "Setup date cannot be blank.";
        }

        if(!this.state.TechName && !this.state.TechCompany) {
            TechError = "Tech name or tech company cannot be blank.";
        }

        if(!this.state.ServiceNotes) {
            ServiceNotesError = "Service note cannot be blank";
        }

        if(TechError) {
            this.setState({TechError, ServiceNotesError, GuitarSetupDateError});
            return false;
        }

        return true;
    }
    
    handleSubmit = (event) => {
        // function to handle submit to the apigateway
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            var serviceRecord = {
                "guitarId" : this.state.GuitarId,
                "techName" : this.state.TechName,
                "techCompany" : this.state.TechCompany,
                "serviceNotes" : this.state.ServiceNotes,
                "guitarSetupDate" : this.state.GuitarSetupDate,
            }
            var json = JSON.stringify(serviceRecord);
            // do something..
            fetch("https://dev.kevinzaworski.com/api/service/", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json,
            }).then(res => {
                if( res.status === 200) {
                    window.location.replace('/')
                } else {
                    this.setState({
                        ServerError : "Error: Something went wrong on the server end, please refresh and try again.."
                    })
                }
            });
        }
    }

    render() {
        if( this.state.connectionError ) {
            return(<div></div> );
        }
        
        if( this.state.ServerError ) {
            return( 
                <div className="card">
                    <h2 className="guitarTitle">{ this.state.ServerError }</h2>
                </div>
            )
        }

        return (
            <div className="card">
            <h2 className="center">Add new Service Record</h2> 
            <form onSubmit={this.handleSubmit}>
                <div className="formError"><p>{this.state.GuitarSetupDateError}</p></div>
                <input
                    type = "date"
                    name = "GuitarSetupDate"
                    placeholder ={ this.state.GuitarSetupDate }
                    onChange={ e=> this.changeTimeSignature(e) }
                />
                <div className="formError"><p>{this.state.TechError}</p></div>
                <input 
                    name = "TechName"
                    placeholder="Tech Name" 
                    value={this.state.TechName} 
                    onChange={e => this.handleChange(e) } 
                />
                <input 
                    name = "TechCompany"
                    placeholder="Tech Company" 
                    value={this.state.TechCompany} 
                    onChange={e => this.handleChange(e) } 
                />
                <input 
                    name = "ServiceNotes"
                    placeholder="Service Notes" 
                    value={this.state.ServiceNotes} 
                    onChange={e => this.handleChange(e) } 
                />
                <div className="formError"><p>{this.state.ServiceNotesError}</p></div>
                <button type="submit" className="centerButton"> Submit </button>
            </form> 
            </div> 
        );
    }
}