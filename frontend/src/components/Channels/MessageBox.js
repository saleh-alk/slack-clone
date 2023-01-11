import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as messageActions from '../../store/messages'
import consumer from '../../consumer';
import { receiveUser } from '../../store/session';
import { useParams } from 'react-router-dom';

function MessageBox() {


    const dispatch = useDispatch()

    const [body, setBody] = useState("")
    // const [channel, setChannel] = useState(1)
    const sessionUserId = useSelector(state => state.session.user.id)
    const [isPrivate, setIsPrivate] = useState(true)
    const [errors, setErrors] = useState([]);

    const [input, setInput] = useState("")
    const {channelId} = useParams()

    

    useEffect(() => {
        // ...

        // Add the following lines to the end of the `useEffect` to create a
        // subscription:
        const subscription = consumer.subscriptions.create(
            { channel: 'ChannelsChannel', id: channelId },
              {
                  connected: () => console.log('connected'),
                  disconnected: () => console.log('disconnected'),
                received: ({message, user}) => {
                    dispatch(messageActions.receiveMessage(message));
                    dispatch(receiveUser(user))
                }
            }
        );

        return () => subscription?.unsubscribe();
    }, [channelId, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setBody(input)
        setInput("")
        messageActions.createMessage({ sessionUserId, channel: channelId, body, isPrivate })
 
           
    }


  return (
    <div className='message-box'>
        <form onSubmit={handleSubmit}>
            <input value={body}
                 placeholder={'Message'}
                  onChange={(e) => setBody(e.target.value)}  />
            <button type="submit" className='send-message'>Send</button>

        </form>
          
    </div>
  )
}

export default MessageBox