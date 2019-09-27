import jwt from 'jsonwebtoken';
import { FETCH_USER } from './types';

export function setCurrentUser (user) {
    return {
        type: FETCH_USER,
        payload: user
    }; 
} 

export function login(loginData) {
    return dispatch => {
        fetch('https://dev.kevinzaworski.com/api/user/login', {
            method: 'POST',
            body: loginData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .then(data => {
            let token = data;
            console.log(token);
            localStorage.setItem("token", token);
            token = jwt.decode(token)
            dispatch(setCurrentUser(token));
        });
        
    }
}