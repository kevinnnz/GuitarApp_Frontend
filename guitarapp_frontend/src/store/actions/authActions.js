import { 
   LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCESS, LOGOUT_ERROR,
   SIGNUP_SUCCESS, SIGNUP_ERROR 
} from './actionTypes';
import firebase from '../../services/firebase';

export const login = (email, password) => {
    return (dispatch) => {
       // login in through firebase
       firebase.auth().signInWithEmailAndPassword(
        email,
        password
       ).then(() => {
          dispatch({ type: LOGIN_SUCCESS });
       }).catch((err) => {
          dispatch({ 
            type: LOGIN_ERROR,
            payload: err
         });
       });
    }
}

export const logout = () => {
   return (dispatch) => {
      firebase.auth().signOut().then(() => {
        dispatch({ type: LOGOUT_SUCESS })
      }).catch((err) => {
         dispatch({ 
            type: LOGOUT_ERROR,
            payload: err
         })
      });
   }
}

export const signup = (email, password) => {
   return (dispatch) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
         dispatch({ type: SIGNUP_SUCCESS })
      ).catch((err) => {
         dispatch({ 
            type: SIGNUP_ERROR,
            payload: err
         })
      })
   }
}
