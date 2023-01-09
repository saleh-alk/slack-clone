import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as messageActions from '../../store/messages'
import consumer from '../../consumer';

function MessageBox({channelId}) {


    const dispatch = useDispatch()

    const [body, setBody] = useState("")
    const [channel, setChannel] = useState(1)
    const sessionUserId = useSelector(state => state.session.user.id)
    const [isPrivate, setIsPrivate] = useState(true)
    const [errors, setErrors] = useState([]);

    const [input, setInput] = useState("")

    

    useEffect(() => {
        // ...

        // Add the following lines to the end of the `useEffect` to create a
        // subscription:
        const subscription = consumer.subscriptions.create(
            { channel: 'ChannelsChannel', id: 1 },
              {
                received: message => {
                    console.log('Received message: ', message);
                }
            }
        );

        return () => subscription?.unsubscribe();
    }, [channelId, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setBody(input)
        setInput("")
        return dispatch(messageActions.createMessage({ sessionUserId, channel, body, isPrivate }))
            .catch(async (res) => {
               
                let data;
                ;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();

                } catch {
                    data = await res.text(); // Will hit this case if the server is down

                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);

            
            });
           
            
           
    }


  return (
    <div className='message-box'>
        {console.log(sessionUserId)}
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