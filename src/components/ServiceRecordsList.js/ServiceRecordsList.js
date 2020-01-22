import React from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

class ServiceRecordList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty : true
        };
    }

    componentDidMount() {
        this.isEmpty(this.props.serviceRecords);
    }

    isEmpty(array) {
        let isEmptyArray = true;
        
        if ( Array.isArray(array) && !array.length) isEmptyArray = true;
        else isEmptyArray = false;

        this.setState({ isEmpty : isEmptyArray });
    }

    render() {
        if(this.state.isEmpty) {
            return(
                <Alert variant="info">
                    <Alert.Heading>No Service Records Found</Alert.Heading>
                    <p>When you add a service record they will show up here.</p>
                </Alert>
            )
        }

        return(
            <>
            <Table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Guitar Tech</th>
                        <th>Work Done</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.serviceRecords.map((service, i) => (
                        <tr key={i}>
                            <td>
                                { service.date }
                            </td>
                            <td>
                                { service.techName } { service.techCompany }
                            </td>
                            <td>
                                { service.workDone }
                            </td>
                            <td>
                                { service.notes }
                            </td>
                        </tr>
                    ))}
                    <tr>

                    </tr>
                </tbody>
            </Table>
            </>
        )
    }
}

export default ServiceRecordList;