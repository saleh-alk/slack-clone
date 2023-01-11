import React, { useState, useEffect } from 'react'
import * as messageActions from '../../store/messages'
import { useDispatch, useSelector } from 'react-redux';
import Message from "./Message.js"
import csrfFetch from '../../store/csrf'
import { useParams } from 'react-router-dom';


function ChatMessages() {
    

    
    //const messages = useSelector(messageActions.receiveMessages)
    const [messages, setMessages] = useState([])
    const dispatch = useDispatch()
    const {channelId} = useParams()
    const m = useSelector(messageActions.getMessages(+channelId))

  

    useEffect(() => {
        dispatch(messageActions.fetchMessages(channelId))
       
    }, [dispatch, channelId])

    


  return (
    
    <div className='chat-messages-box'>

    
        <ul>{m.map((message, i) => <Message message={message} key={i} />) }
            
        </ul>
    </div>

  )
}

export default ChatMessages