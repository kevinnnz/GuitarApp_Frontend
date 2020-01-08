import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';

// Firebase stuff
import firebase from '../src/services/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import Main from './layouts/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';

const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <Main />
        </ReactReduxFirebaseProvider>
    </Provider>, document.getElementById('root')
);
