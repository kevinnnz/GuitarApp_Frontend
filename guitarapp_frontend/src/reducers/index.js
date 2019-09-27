import { combineReducers } from 'redux';
import guitarReducer from './guitarReducer';
import userReducer from './authReducer';

export default combineReducers({
    guitars: guitarReducer,
    user: userReducer
});