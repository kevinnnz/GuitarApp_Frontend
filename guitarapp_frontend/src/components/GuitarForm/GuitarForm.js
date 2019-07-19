import React from "react";

const initalState = {
    GuitarMake: "",
    GuitarModel: "",
    GuitarSerial: "",
    GuitarColour: "",
    GuitarYear: "",
    GuitarOwnerId: "dummyuser",
    GuitarMakeError: "",
    GuitarModelError: "",
    GuitarSerialError: "",
    GuitarColourError: "",
    GuitarYearError: ""
};

export default class GuitarForm extends React.Component {
    constructor() {
        super();
        this.state = initalState;
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    validateForm = () => {
        let GuitarMakeError = "";
        let GuitarModelError = "";
        let GuitarSerialError = "";
        let GuitarColourError = "";
        let GuitarYearError = "";

        if(!this.state.GuitarMake) {
            GuitarMakeError = "Guitar Make cannot be blank!";
        }

        if(!this.state.GuitarModel) {
            GuitarModelError = "Guitar Model is required!";
        }

        if(!this.state.GuitarSerial) {
            GuitarSerialError = "Guitar Serial is required!";
        }

        if(!this.state.GuitarColour) {
            GuitarColourError = "Guitar Colour is required!";
        }

        if(!this.state.GuitarYear) {
            GuitarYearError = "Guitar Year is required!";
        }

        if(GuitarMakeError || GuitarModelError || GuitarSerialError || GuitarColourError || GuitarYearError) {
            this.setState({GuitarMakeError, GuitarModelError, GuitarSerialError, GuitarColourError, GuitarYearError});
            return false;
        }

        return true;
    }
    
    handleSubmit = (event) => {
        // function to handle submit to the apigateway
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            var guitar = {
                "guitarMake" : this.state.GuitarMake,
                "guitarModel" : this.state.GuitarModel,
                "guitarSerial" : this.state.GuitarSerial,
                "guitarColour" : this.state.GuitarColour,
                "guitarOwnerId" : this.state.GuitarOwnerId,
                "guitarYear" : this.state.GuitarYear
            }
            var json = JSON.stringify(guitar);
            console.log(json);
            // do something..
            fetch("http://dev.kevinzaworski.com:8080/api/guitars/", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json,
            }).then(res => {
                console.log(res);
            });

            //window.location.replace('/');
        }
    }

    render() {
        if( this.state.connectionError ) {
            return(<div></div> );
        }        

        return (
            <div className="card">
            <h2 className="center">Add new Guitar</h2> 
            <form onSubmit={this.handleSubmit}>
                <input 
                    name = "GuitarMake"
                    placeholder="Guitar Make" 
                    value={this.state.GuitarMake} 
                    onChange={e => this.handleChange(e) } 
                />
                <div className="formError"><p>{this.state.GuitarMakeError}</p></div>
                <input 
                    name = "GuitarModel"
                    placeholder="Guitar Model" 
                    value={this.state.GuitarModel} 
                    onChange={e => this.handleChange(e) } 
                />
                <div className="formError"><p>{this.state.GuitarModelError}</p></div>
                <input 
                    name = "GuitarSerial"
                    placeholder="Guitar Serial" 
                    value={this.state.GuitarSerial} 
                    onChange={e => this.handleChange(e) } 
                />
                <div className="formError"><p>{this.state.GuitarSerialError}</p></div>
                <input 
                    name = "GuitarColour"
                    placeholder="Guitar Colour" 
                    value={this.state.GuitarColour} 
                    onChange={e => this.handleChange(e) } 
                />
                <div className="formError"><p>{this.state.GuitarColourError}</p></div>
                <input 
                    name = "GuitarYear"
                    placeholder="Guitar Year" 
                    value={this.state.GuitarYear} 
                    onChange={e => this.handleChange(e) } 
                />
                <div className="formError"><p>{this.state.GuitarYearError}</p></div>
                <button type="submit" className="centerButton"> Submit </button>
            </form> 
            </div> 
        );
    }
}