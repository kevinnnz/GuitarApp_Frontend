import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';

import Layout from './components/Layout';
import * as serviceWorker from './serviceWorker';
import "./style/index.css"
import "./style/structure.css"

ReactDOM.render(<Provider store={store}><Layout /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();