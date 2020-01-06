import {
    IS_FETCHING,
    IS_FETCHING_GUITAR,
    FETCH_GUITARS,
    FETCH_GUITAR, 
    ORDER_GUTIARS
} from "./actionTypes";

export const fetchGuitars = (uid, token) => dispatch => {
    dispatch({
        type: IS_FETCHING,
        payload: true
    });
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
    })).finally(dispatch({
        type: IS_FETCHING,
        payload: false
    }));
}

export const fetchGuitar = (guitarId, uid, token) => dispatch => {
    dispatch({
        type: IS_FETCHING_GUITAR,
        payload: true,
    });
    fetch(`https://dev.kevinzaworski.com/api/guitar/g/${guitarId}`,{
        headers: {
            'authorization' : 'Bearer ' + token,
            'owner' : uid
        }
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }

        if (res.status === 404) {
            return res.json();
        }
    }).then(guitar => dispatch({
        type: FETCH_GUITAR,
        payload: guitar
    })).finally(dispatch({
        type: IS_FETCHING_GUITAR,
        payload: false
    }));
}

export const orderGuitars = (guitars, orderBy, orderDir) => dispatch => {
    let order;

    if(orderDir === 'asc') {
        order = 1;
    } else {
        order = -1;
    }

    let filteredGuitars = guitars.sort((a, b) => {
        if(a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) {
            return -1 * order;
        } else {
            return 1 * order;
        }
    });

    dispatch({
        type: ORDER_GUTIARS,
        payload: filteredGuitars
    });
}