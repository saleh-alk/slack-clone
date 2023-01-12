import csrfApiFetch from './csrf';

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
const CLEAR_MESSAGES = "CLEAR_MESSAGES"

export const receiveMessage = message => {
    return {
        type: RECEIVE_MESSAGE,
        message
    };
};

export const receiveMessages = messages => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    };
};

export const removeMessage = messageId => {
    return {
        type: REMOVE_MESSAGE,
        messageId
    };
};

export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGES
    }
}



export const createMessage = (message) => {
    const { sessionUserId, channel, body, isPrivate } = message
    csrfApiFetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({
            user_id: sessionUserId,
            channel_id: channel,
            body,
            private: isPrivate
        })
    })
};

export const fetchMessages = (channelId) => async (dispatch) => {
    const res = await csrfApiFetch(`/api/messages?channelId=${channelId}`)

    if (res.ok) {
        let messages = await res.json()
        dispatch(receiveMessages(messages))
        return messages

    }
}

export const destroyMessage =(id) => async (dispatch) => {
    const res = await csrfApiFetch(`/api/messages/${id}`, {
        method: 'DELETE'
    })
   
    if(res.ok){
        let data = await res.json()
        dispatch(removeMessage(id))
    }
};

export const getMessages = (channelId) => (state) =>{
    if(state?.message){
        return Object.values(state.message).filter((msg) => msg.channelId === channelId)
    } else{
        return []
    }
} 

const messagesReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_MESSAGE:
            const { message } = action;
            return { ...state, [message.id]: message };
        case RECEIVE_MESSAGES:

            action.messages.forEach(msg => {
                newState[msg.id] = msg
            });
            return newState
        case REMOVE_MESSAGE:
            
            delete newState[action.messageId];
            return newState;
        case CLEAR_MESSAGES:
            return {}
        default:
            return state;
    }
};

export default messagesReducer;