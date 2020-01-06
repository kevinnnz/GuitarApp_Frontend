import { 
    FETCH_GUITARS, FETCH_GUITAR, IS_FETCHING, IS_FETCHING_GUITAR 
} from '../actions/actionTypes'

const initialState = {
    guitars: [],
    guitar: [],
    isFetching: false, 
    isFetchingGuitar: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_GUITARS:
            return {
                ...state,
                guitars: action.payload
            }
        case FETCH_GUITAR:
            return {
                ...state,
                guitar: action.payload
            }
        case IS_FETCHING: 
            return {
                ...state,
                isFetching: action.payload
            }
        case IS_FETCHING_GUITAR: 
            return {
                ...state,
                isFetchingGuitar: action.payload
            }
        default: 
            return state;
    }
}