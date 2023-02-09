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
                  
                received: ({type, message, user, id}) => {
                    
                switch(type){
                    case 'RECIEVE_MESSAGE': 
                        dispatch(messageActions.receiveMessage(message));
                        dispatch(receiveUser(user))
                        break;
                    case 'DESTROY_MESSAGE':
                        dispatch(messageActions.removeMessage(id))
                        break;
                    default:
                        dispatch(messageActions.receiveMessage(message));
                        dispatch(receiveUser(user))
                        break;

                   }
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
        <div className='inner-message-box'>
            <form className='sender-form' onSubmit={handleSubmit}>
                <input className="message-input"
                    value={body}
                    placeholder={'Message'}
                    onChange={(e) => setBody(e.target.value)}
                     />
                     <div className='bottom-message'>
                        <div></div>
                        <div className='send-message-button'>
                          <button type="submit" className='send-message'><i class="fa-sharp fa-solid fa-paper-plane"></i></button>
                        </div>
                     </div>

            </form>
        </div>
          
    </div>
  )
}

export default MessageBox