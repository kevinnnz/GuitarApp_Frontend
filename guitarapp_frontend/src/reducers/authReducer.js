import { FETCH_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuth : false,
    user : { }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_USER:
            return {
                ...state,
                isAuth : !isEmpty(action.payload),
                user: action.payload
            }
        default: 
            return state;
    }
}