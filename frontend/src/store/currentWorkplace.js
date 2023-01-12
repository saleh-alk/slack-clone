const RECEIVE_WORKPLACE = "RECEIVE_WORKPLACE"


export const receiveWorkplace = (workplace) => ({
    type: RECEIVE_WORKPLACE,
    payload: workplace
})



export const fetchWorkplace = (workplaceId) => async (dispatch) => {
    const res = await fetch(`/api/workplaces/${workplaceId}`)

    if (res.ok) {
        const workplace = await res.json()
        dispatch(receiveWorkplace(workplace))
        return workplace
    }
}


const currentWorkplaceReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_WORKPLACE:
            return { ...state, workplace: action.payload.workplace }
        default:
            return state;
    }
};

export default currentWorkplaceReducer;