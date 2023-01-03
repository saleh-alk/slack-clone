import csrfFetch from './csrf';



const SET_CURRENT_WORKPLACE = 'workplace/setCurrentWorkplace';

export const RECEIVE_WORKPLACES = "workplace/RECEIVE_WORKPLACES"

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