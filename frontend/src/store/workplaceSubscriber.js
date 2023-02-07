import csrfFetch from './csrf';


const SET_CURRENT_WORKPLACE_SUBSCRIBER = 'SET_CURRENT_WORKPLACE_SUBSCRIBER ';

const RECEIVE_WORKPLACE_SUBSCRIBERS = "RECEIVE_WORKPLACE_SUBSCRIBERS"



const setCurrentWorkplaceSubscriber = (workplaceSubsciber) => {
    return {
        type: SET_CURRENT_WORKPLACE_SUBSCRIBER,
        payload: workplaceSubsciber
    };
};

export const receiveWorkplaceSubscribers = (workplaceSubscibers) => ({
    type: RECEIVE_WORKPLACE_SUBSCRIBERS,
    payload: workplaceSubscibers
})

export const getWorkplaces = (store) => {
    if (store?.workplaceSubscriber) {
        return Object.values(store.workplaceSubscriber)
    }
    return []
}


export const fetchWorkplaceSubscribers = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/workplace_subscriptions?userId=${userId}`)

    if (res.ok) {
        const workplaceSubscribed = await res.json()
        dispatch(receiveWorkplaceSubscribers(workplaceSubscribed))
        return workplaceSubscribed
    }
}

export const fetchSubscribers = (workplaceId) => async (dispatch) => {
    const res = await csrfFetch(`/api/workplace_subscriptions/${workplaceId}`)

    if(res.ok){
        const subscribers = await res.json()
        dispatch(receiveWorkplaceSubscribers(subscribers))
    }
}

const workplaceSubscriberReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_WORKPLACE_SUBSCRIBERS:
            return { ...state, workplaceSubscriber: action.payload }
        case SET_CURRENT_WORKPLACE_SUBSCRIBER:
            return {...state, workplaceSubscriber: action.payload}
        default:
            return state;
    }
};

export default workplaceSubscriberReducer;


export const createWorkspaceSubscriber = (workplaceSubscriber) => async (dispatch) => {
    const { username, workplaceId } = workplaceSubscriber;
    const response = await csrfFetch("/api/workplace_subscriptions", {
        method: "POST",
        body: JSON.stringify({
            username,
            workplaceId
        })
    });
    const data = await response.json();
    dispatch(setCurrentWorkplaceSubscriber(data.workplaceSubscription));
    return response;
};