import { combineReducers } from 'redux';
import guitarReducer from './guitarReducer';

export default combineReducers({
    guitars: guitarReducer
});