import csrfFetch from './csrf';



const SET_CURRENT_WORKPLACE = 'workplace/setCurrentWorkplace';

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

export const getWorkplaces = (store) => {
    if (store.workplaces) {
        return Object.values(store.workplaces)
    }
    return []
}



export const fetchWorkplaces = () => async (dispatch) => {
    const res = await fetch("/api/workplaces")

    if (res.ok) {
        const workplaces = await res.json()
        dispatch(receiveWorkplaces(workplaces))
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