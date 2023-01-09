import React, { useState, useEffect } from 'react'
import * as messageActions from '../../store/messages'
import { useDispatch, useSelector } from 'react-redux';
import Message from "./Message.js"

function ChatMessages() {
    

    
    //const messages = useSelector(messageActions.receiveMessages)
    const [messages, setMessages] = useState()
    const dispatch = useDispatch()

    const fetchMessages = () => async (dispatch) => {
        const res = await fetch("/api/messages")

        if (res.ok) {
            const message = await res.json()
            //dispatch(receiveWorkplaces(workplaces))
            setMessages(message)
        }
    }

    useEffect(() => {
        dispatch(fetchMessages())
       
    }, [])
  return (
    
    <div className='chat-messages-box'>
        <ul>{messages ? messages.map((message, i) => <Message message={message} key={i} />) : <></>}
            
        </ul>
    </div>

  )
}

export default ChatMessages