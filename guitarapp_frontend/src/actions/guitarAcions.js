import {
    FETCH_GUITARS,
} from "./types";

export const fetchGuitars = (user, token) => dispatch => {
    fetch(`https://dev.kevinzaworski.com/api/guitar/${user}`,{
        headers: {
            'auth-token' : token
        }
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }

        if (res.status === 404) {
            return res.json();
        }
    }).then(guitars => dispatch({
        type: FETCH_GUITARS,
        payload: guitars
    }));
}