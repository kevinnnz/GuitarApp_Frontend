import { FETCH_GUITARS, NEW_GUITAR } from '../actions/types'

const initialState = {
    guitars: [], 
    guitar: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_GUITARS:
            return {
                ...state,
                guitars: action.payload
            }
        default: 
            return state;
    }
}