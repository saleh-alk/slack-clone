import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { receiveMessage, removeMessage, getMessages, createMessage, destroyMessage } from '../../store/messages';
import { fetchChannel } from '../../store/channel';
import { receiveUser } from '../../store/session';
import Message from '../Messages';
import csrfApiFetch from '../../store/csrf';

function Channel() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState('');
  const [usersInChannel, setUsersInChannel] = useState({});

  const { id: channelId } = useParams();
  const messages = useSelector(getMessages(channelId));
  const currentUserId = useSelector(state => state.currentUserId)
  // const channel = useSelector(state => state.channels[channelId]);

  const [channel, setChannel] = useState("hi");

// const fetchChannel = id => dispatch => {
//     return csrfApiFetch(`channels/${id}`).then(({ channel, messages, users }) => {
//       setChannel(channel)
//     });
//   };

  const fetchChannel = id => async(dispatch) => {
    const res = await csrfApiFetch(`channels/${id}`)

    if (res.ok) {
      const channel = await res.json()
      setChannel(channel)
    }
  }

  const activeMessageRef = useRef(null);
  const messageUlRef = useRef(null);
  const prevChannel = useRef(null);
  const numMessages = useRef(0);

  const activeMessageId = parseInt(history.location.hash.slice(1));
  const usersInChannelArray = Object.values(usersInChannel);

  // Scroll to message selected from mentions menu
  useEffect (() => {
    if (activeMessageRef.current) scrollToMessage();
  }, [activeMessageId]);

  // Scroll to new messages as they come in
  useEffect(() => {
    if (channelId === prevChannel.current && numMessages.current < messages.length) {
      // Remove any hash values from the URL
      if (history.location.hash)
        history.push(history.location.pathname);
      scrollToBottom();
    }
    // numMessages.current = messages.length;
  }, [messages, channelId, history]);

  // Effect to run when entering a channel
  useEffect(() => {
  //   dispatch(fetchChannel(channelId)).then(() => {
  //     if (activeMessageRef.current) {
  //       scrollToMessage();
  //     } else {
  //       scrollToBottom();
  //     }
  //     prevChannel.current = channelId;
  //   });
  // }
      dispatch(fetchChannel(channelId))}
  , [channelId, dispatch]);

  const scrollToMessage = () => {
    activeMessageRef.current.focus();
    activeMessageRef.current.scrollIntoView();
  };

  const scrollToBottom = () => {
    messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
  };

  const setReaction = (id, reaction) => {
    setUsersInChannel(prevUsersInChannel => ({ ...prevUsersInChannel, [id]: { ...prevUsersInChannel[id], reaction } }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    createMessage({ body, channelId, userId: currentUserId }).then(({ message, user }) => {
      dispatch(receiveMessage(message));
      dispatch(receiveUser(user));
      setBody('');
    });
  };

  const handleDelete = messageId => {
    destroyMessage(messageId).then(() => {
      removeMessage(messageId);
    });
  };

  const generateReactions = (...reactions) => {
    return reactions.map(reaction => (
      <span
        key={reaction}
        className='reaction'
        onClick={() => setReaction(currentUserId, reaction)}
      >
        {reaction}
      </ span>
    ));
  };

  return (
    <>
      <section className='room home-section'>
        <h1>{channel?.name}</h1>
        <h1>{console.log(channel)}</h1>

        <ul ref={messageUlRef ? messageUlRef : console.log(messageUlRef)}>
          {messages ? messages.map(message => (
            <li
              key={message.id}
              ref={activeMessageId === message.id ? activeMessageRef : null}
              tabIndex={-1}
            >
              <Message {...message} />
              {message.userId === currentUserId && (
                <button
                  className='btn-delete'
                  onClick={() => handleDelete(message.id)}
                >
                  x
                </button>
              )}
            </li>
          )) : <></>}
        </ul>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={body.split('\n').length}
            onChange={e => setBody(e.target.value)}
            onKeyDown={e => {
              if (e.code === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            value={body}
          />
          <div className='message-controls'>
            <div>
              {generateReactions('👍', '❤️', '🔥', '😡')}
            </div>
            <button className='btn-primary' disabled={!body}>
              Send Message
            </button>
          </div>
        </form>
      </section>
      <section className='online-users home-section'>
        <h2>In channel</h2>
        <ul >
          {usersInChannelArray.map(({ id, username, reaction }) => (
            <li key={id} className={currentUserId === id ? 'current' : ''}>
              <span className='reaction'>{reaction}</span>
              <span>{username}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Channel;