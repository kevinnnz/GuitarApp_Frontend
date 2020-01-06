import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGuitars, orderGuitars } from '../../store/actions/guitarAcions';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonToolBar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import GuitarForm from '../GuitarForm/GuitarForm';
import GuitarHealth from '../GuitarHealth/GuitarHealth';


// GUITARTABLE
// MAIN UI for the users guitars
export class GuitarTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderBy: 'guitarMake',
            orderDir: 'desc',
            show: false
        }
        this.handleModal = this.handleModal.bind(this);
        this.filterBy = this.filterBy.bind(this);
    }

    componentDidMount() {
        this.orderBy();
    }
        
    handleModal() {
        this.setState({ show: !this.state.show });
    }
    
    filterBy(dir, order) {
        this.setState({
            orderDir: dir,
            orderBy: order
        });
        
        this.orderBy();
    }

    orderBy() {
        this.props.orderGuitars(this.props.guitars, this.state.orderBy, this.state.orderDir);
    }

    render() {
        return(
            <Container>
                <Card style={{
                    marginTop: 25
                }}>
                    <Card.Body>
                    <Row style={{marginBottom : 10}}>
                        <Col lg={8}>
                            <h2>Guitars</h2>
                        </Col>
                        <Col lg={4} className="text-right">
                            <ButtonToolBar className="float-right">
                                <Button variant="primary" onClick={this.handleModal} style={{marginRight: 10}}>
                                    Add Guitar
                                </Button>
                                <GuitarForm 
                                    show={this.state.show}
                                    onHide={this.handleModal}
                                />
                                <DropdownButton
                                title="Filter"
                                variant="secondary"
                                id='dropdown-filter'
                                >
                                    <Dropdown.Header>Order By:</Dropdown.Header>
                                    <Dropdown.Item  className={
                                        (this.state.orderBy === 'guitarMake' ? 'active' : '')
                                    }
                                    onClick={(e) => this.filterBy(this.state.orderDir, 'guitarMake')}
                                    >Make</Dropdown.Item>
                                    <Dropdown.Item className={
                                        (this.state.orderBy === 'guitarModel' ? 'active' : '')
                                    }
                                    onClick={(e) => this.filterBy(this.state.orderDir, 'guitarModel')}
                                    >Model</Dropdown.Item>
                                    <Dropdown.Item className={
                                        (this.state.orderBy === 'guitarSerial' ? 'active' : '')
                                    }
                                    onClick={(e) => this.filterBy(this.state.orderDir, 'guitarSerial')}
                                    >Serial</Dropdown.Item>
                                    <Dropdown.Item className={
                                        (this.state.orderBy === 'guitarYear' ? 'active' : '')
                                    }
                                    onClick={(e) => this.filterBy(this.state.orderDir, 'guitarYear')}
                                    >Year</Dropdown.Item>
                                    <Dropdown.Divider /> 
                                    <Dropdown.Header>Order Direction:</Dropdown.Header>
                                    <Dropdown.Item className={
                                        (this.state.orderDir === 'asc' ? 'active' : '')
                                    }
                                    onClick={(e) => this.filterBy('asc', this.state.orderBy)}
                                    >Asc</Dropdown.Item>
                                    <Dropdown.Item className={
                                        (this.state.orderDir === 'desc' ? 'active' : '')
                                    }
                                    onClick={(e) => this.filterBy('desc', this.state.orderBy)}
                                    >Desc</Dropdown.Item>
                                </DropdownButton>
                            </ButtonToolBar>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                        <Table className="table">
                            <thead>
                                <tr>
                                    <th>Guitar</th>
                                    <th>Health</th>
                                    <th ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.guitars.map(guitar => (
                                    <tr key={guitar._id}>
                                        <td className="text-capitalize">{ guitar.guitarColour + ' ' + guitar.guitarModel }</td>
                                        <td><GuitarHealth serviceRecords={ guitar.serviceRecords } /></td>
                                        <td className="text-right">
                                            <Link to={`/guitar/${guitar._id}`}>
                                                <Button color="primary" variant="link" size="sm">Details</Button>
                                            </Link>
                                        </td> 
                                    </tr> 
                                ))}   
                            </tbody>
                        </Table>
                        </Col>
                    </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

GuitarTable.propTypes = {
    fetchGuitars: PropTypes.func.isRequired,
    orderGuitars: PropTypes.func.isRequired,
    guitars: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    guitars: state.guitars.guitars,
    auth: state.firebase.auth
});

export default connect(mapStateToProps, { fetchGuitars, orderGuitars })(GuitarTable);
