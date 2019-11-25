import {
    FETCH_GUITARS,
} from "./actionTypes";

export const fetchGuitars = (uid, token) => dispatch => {
    fetch(`https://dev.kevinzaworski.com/api/guitar/${uid}`,{
        headers: {
            'authorization' : 'Bearer ' + token
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