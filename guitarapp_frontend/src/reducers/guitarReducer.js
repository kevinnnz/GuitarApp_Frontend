import { FETCH_GUITARS } from '../actions/types'

const initialState = {
    guitars: []
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