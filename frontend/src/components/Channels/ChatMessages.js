import React, { useState, useEffect } from 'react'
import * as messageActions from '../../store/messages'
import { useDispatch, useSelector } from 'react-redux';
import Message from "./Message.js"
import csrfFetch from '../../store/csrf'
import { useParams } from 'react-router-dom';
import ChatBoxHeader from './ChatBoxHeader';
import MessageBox from './MessageBox';


function ChatMessages() {
    

    
    //const messages = useSelector(messageActions.receiveMessages)
    const [messages, setMessages] = useState([])
    const dispatch = useDispatch()
    const {channelId} = useParams()
    const {workplaceId} = useParams()
    const m = useSelector(messageActions.getMessages(+channelId))

  

    useEffect(() => {
        dispatch(messageActions.fetchMessages(channelId))
        return () => dispatch(messageActions.clearMessage())
       
    }, [dispatch, channelId, workplaceId])

    


  return (
    
    <div className='channel-chat-messages'>
      <ChatBoxHeader />
      <div className='chat-messages-box'>
        
        <div></div>
        <div className='channel-message-list-recipt'>
          {m.map((message, i) => <Message message={message} key={i} />)}
        </div>

        <div className='chat-message-box-inner'>
          <div className='chat-message-box-intro'>
            <div className='img-intro-message-box'></div>
            <div className='intro-message-container'>
              This is the very begining of the channel
            </div>
          </div>

        </div>

       
      </div>

       <MessageBox />
    
        {/* <ul>{m.map((message, i) => <Message message={message} key={i} />) }
            
        </ul> */}
    </div>

  )
}

export default ChatMessages