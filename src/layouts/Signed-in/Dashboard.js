import React from 'react';
// STORE
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGuitars } from '../../store/actions/guitarAcions';

// UI
import GuitarTable from '../../components/GuitarTable/GuitarTable';
import GuitarDetails from '../../components/GuitarDetails/GuitarDetails';
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";

class Dashboard extends React.Component {
    
    componentDidMount() {
        // initializing the store
        this.props.fetchGuitars(this.props.auth.uid, this.props.auth.stsTokenManager.accessToken);
    }

    render() {
        return (
            <>
                <Router>
                    <Switch>
                        <Route exact path="/" component={GuitarTable} />
                        <Route exact path="/guitar/:id" render={({ match }) => <GuitarDetails match={match} />} />
                    </Switch>
                </Router> 
            </>
        )
    }
}

Dashboard.propTypes = {
    fetchGuitars: PropTypes.func.isRequired,
    guitars: PropTypes.array.isRequired,
};

const MapStateToProps = state => ({
    guitars: state.guitars.guitars,
    auth: state.firebase.auth
});

export default connect(MapStateToProps, { fetchGuitars })(Dashboard)