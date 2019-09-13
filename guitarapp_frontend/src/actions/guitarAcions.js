import {
    FETCH_GUITARS,
    NEW_GUITAR
} from "./types";

export const fetchGuitars = (user) => dispatch => {
    fetch(`https://dev.kevinzaworski.com/api/guitar/${user}`).then((res) => {
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