import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGuitar } from '../../store/actions/guitarAcions';

import ServiceForm from '../ServiceForm/ServiceForm';
import Playability from '../Playability/Playability';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import ServiceRecordList from '../ServiceRecordsList.js/ServiceRecordsList';

class GuitarDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            undefined: true,
            show: false,
        };
        this.handleModal = this.handleModal.bind(this);
    }

    componentDidMount() {
        this.props.fetchGuitar(this.props.match.params.id, this.props.auth.uid, this.props.auth.stsTokenManager.accessToken);
    }

    handleModal() {
        this.setState({
            show : !this.state.show
        });
    }

    render() {
        return(
            <Container>
                 <Row>
                    <Col lg={8}>
                        <Card
                            style={{
                                marginTop: 25
                            }}
                        >
                            { this.props.guitar.map((guitar, i )=> (
                            <Card.Body>
                                    <Row key={i}>
                                        <Col lg={8}>
                                            <h2 className="text-capitalize">{ guitar.guitarColour + ' ' + guitar.guitarModel }</h2>
                                            <p>{ guitar.guitarYear + ' ' + guitar.guitarSerial }</p>
                                        </Col>
                                        <Col lg={4} className="text-right">
                                            <Button variant="primary" onClick={this.handleModal}>Add Service Record</Button>
                                        </Col>
                                        <ServiceForm
                                            id={guitar._id}
                                            show={this.state.show}
                                            onHide={this.handleModal}
                                        />
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <ServiceRecordList serviceRecords={guitar.serviceRecords} />
                                        </Col>
                                    </Row> 
                            </Card.Body>
                            ))}
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card style={{
                                marginTop: 25
                        }}>
                            <Card.Body>
                                <h2>Playability</h2>
                                { this.props.guitar.map(guitar => (
                                    <Playability servicerecords={guitar.serviceRecords} />
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        ); 
    }
}

GuitarDetails.propTypes = {
    fetchGuitar: PropTypes.func.isRequired,
    guitar: PropTypes.array.isRequired,
};

const MapStateToProps = state => ({
    guitar: state.guitars.guitar,
    isFetching: state.guitars.isFetching,
    auth: state.firebase.auth
});

export default connect(MapStateToProps, { fetchGuitar })(GuitarDetails)