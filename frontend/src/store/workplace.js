import csrfFetch from './csrf';



const SET_CURRENT_WORKPLACE = 'workplace/setCurrentWorkplace';
const RECEIVE_WORKPLACE = "RECEIVE_WORKPLACE"
export const RECEIVE_WORKPLACES = "workplace/RECEIVE_WORKPLACES"


const setCurrentWorkplace = (workplace) => {
    return {
        type: SET_CURRENT_WORKPLACE,
        payload: workplace
    };
};


export const receiveWorkplaces = (workplaces) => ({
    type: RECEIVE_WORKPLACES,
    payload: workplaces
})


export const receiveWorkplace = (workplace) => ({
    type: RECEIVE_WORKPLACE,
    payload: workplace
})

export const getWorkplaces = (store) => {
    if (store?.workplace) {
        return Object.values(store.workplace)
    }
    return []
}




export const fetchWorkplaces = (userId) => async (dispatch) => {
    const res = await fetch(`/api/workplaces?userId=${userId}`)

    if (res.ok) {
        const workplaces = await res.json()
        dispatch(receiveWorkplaces(workplaces))
        return workplaces
    }
}

export const fetchWorkplace = (workplaceId) => async (dispatch) => {
    const res = await fetch(`/api/workplaces/${workplaceId}`)

    if (res.ok) {
        const workplace = await res.json()
        dispatch(receiveWorkplace(workplace))
        return workplace
    }
}

const workplaceReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_WORKPLACES:
            return {...state, workplace: action.payload }
        default:
            return state;
    }
};

export default workplaceReducer;



export const createWorkspace = (workplace) => async (dispatch) => {
    const { name, url, admin } = workplace;
    const response = await csrfFetch("/api/workplaces", {
        method: "POST",
        body: JSON.stringify({
            name,
            url,
            admin
        })
    });
    const data = await response.json();
    //console.log(data)
    dispatch(setCurrentWorkplace(data.workplace));
    return response;
};

export const createSubscriber = (subscriber) => async (dispatch) => {
    const { user_id, workplace_id } = subscriber;
    const response = await csrfFetch("/api/workplace_subsciptions", {
        method: "POST",
        body: JSON.stringify({
            user_id,
            workplace_id
        })
    });
    const data = await response.json();
    dispatch(setCurrentWorkplace(data.subscriber));
    return response;
};