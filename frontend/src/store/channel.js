import { receiveMessages } from './messages';
import { receiveUsers } from './session';
import csrfApiFetch from './csrf';

const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

export const receiveChannel = channel => {
    return {
        type: RECEIVE_CHANNEL,
        channel
    };
};

export const receiveChannels = channels => {
    return {
        type: RECEIVE_CHANNELS,
        channels
    };
};

export const removeChannel = channelId => {
    return {
        type: REMOVE_CHANNEL,
        channelId
    };
};



// export const fetchChannels = () => dispatch => {
//     return csrfApiFetch('channels').then(({ channels, users }) => {
//         dispatch({
//             type: RECEIVE_CHANNELS,
//             channels
//         });
//         dispatch(receiveUsers(users));
//     });
// };


export const fetchChannels = (workplaceId) => async dispatch => {
    const res = await fetch(`/api/channels?workplace_id=${workplaceId}}`)

    if(res.ok){
        const channels = await res.json()
        dispatch(receiveChannels(channels))
        return channels
    }
}

export const fetchChannel = (id) => dispatch => {
    return csrfApiFetch(`channels/${id}`).then(({ channel, messages, users }) => {
        dispatch(receiveMessages(messages));
        dispatch(receiveChannel(channel));
        dispatch(receiveUsers(users));
    });
};

export const createChannel = channel => dispatch => {
    return csrfApiFetch('channels', {
        method: 'POST',
        data: { channel }
    }).then(channel => dispatch(receiveChannel(channel)));
};

export const destroyChannel= channelId => dispatch => {
    return csrfApiFetch(`channels/${channelId}`, {
        method: 'DELETE'
    }).then(() => dispatch(removeChannel(channelId)));
};

const channelsReducer = (state = {}, action) => {
    switch (action.type) {
        // case RECEIVE_CHANNEL:
        //     const { channel } = action;
        //     return { ...state, [channel.id]: channel };
        case RECEIVE_CHANNELS:
            return { ...state, ...action.channels };
        case REMOVE_CHANNEL:
            const newState = { ...state };
            delete newState[action.channelId];
            return newState;
        default:
            return state;
    }
};

export default channelsReducer;