import { combineReducers } from 'redux';
import guitarReducer from './guitarReducer';
import authReducer from './authReducer';
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
    auth: authReducer,
    guitars: guitarReducer,
    firebase: firebaseReducer
});