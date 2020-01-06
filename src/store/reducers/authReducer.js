const initialState = {
    authError : null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login failed'
            }
        
        case 'LOGIN_SUCCESS' :
            return {
                ...state,
                authError: null
            }

        case 'LOGOUT_ERROR' :
            return {
                ...state,
                authError: 'Logout failed'
            }
        
        case 'LOGOUT_SUCCESS' :
            return {
                ...state,
                authError: null
            }

        default: 
            return state;
    }
}

export default authReducer;