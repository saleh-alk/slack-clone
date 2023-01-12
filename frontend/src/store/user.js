
import csrfApiFetch from './csrf';
const RECIEVE_NEW_USERS = "RECIEVE_NEW_USERS"

export const receiveNewUsers = (payload) => {
    return {
        type: RECIEVE_NEW_USERS,
        payload
    };
};


const userReducer = (state = {}, action) => {
    switch (action.type) {
        case RECIEVE_NEW_USERS:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};




export const fetchUser = () => async (dispatch) => {
    const res = await csrfApiFetch(`/api/users`)

    if (res.ok) {
        let user = await res.json()
        dispatch(receiveNewUsers(user))
        return user

    }
}

export default userReducer;