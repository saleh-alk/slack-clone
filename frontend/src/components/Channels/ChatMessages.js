import React, { useState, useEffect } from 'react'
import * as messageActions from '../../store/messages'
import { useDispatch, useSelector } from 'react-redux';
import Message from "./Message.js"
import csrfFetch from '../../store/csrf'
import { useParams } from 'react-router-dom';
import ChatBoxHeader from './ChatBoxHeader';
import MessageBox from './MessageBox';
import ChannelEditModal from './ChatEditModal.js';

function ChatMessages() {
    

    
    //const messages = useSelector(messageActions.receiveMessages)
    const [messages, setMessages] = useState([])
    const dispatch = useDispatch()
    const [editShow, setEditShow] = useState(false)
    const {channelId} = useParams()
    const {workplaceId} = useParams()
    const channels = useSelector(state => state.channel.channels)
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
              <div>This is the very begining of the&nbsp; </div> {channels && Object.values(channels)?.map((channel) => channelId == channel.id && <strong><div> {channel.name}&nbsp; </div></strong>)} channel. 
              {/* <div className="add-more-channels" onClick={() => setEditShow(true)}>Edit Channel</div>
              <ChannelEditModal onClose={() => setEditShow(false)} editShow={editShow} /> */}
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