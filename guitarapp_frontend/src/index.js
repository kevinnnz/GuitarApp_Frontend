import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';

// Firebase stuff
import firebase from '../src/services/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import Routes from './layouts/Routes'
import "./style/index.css"
import "./style/structure.css"

const rrfProps = {
    firebase,
    config: {
		userProfile: "users"
	},
    dispatch: store.dispatch
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <Routes />
        </ReactReduxFirebaseProvider>
    </Provider>, document.getElementById('root')
);
