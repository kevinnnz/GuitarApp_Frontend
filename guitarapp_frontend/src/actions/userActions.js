import {
    FETCH_USER,
} from "./types";

export const fetchUser = (token) => dispatch => {
    console.log(token);
    fetch(`https://dev.kevinzaworski.com/api/user/token`, {
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'auth-token' : token
        }
    }).then((res) => {
        console.log(res);
        if (res.status === 200) {
            return res.json();
        }

        if (res.status === 404) {
            return res.json();
        }
    }).then(user => dispatch({
        type: FETCH_USER,
        payload: user
    }));
}