import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { createChannel, destroyChannel, fetchChannels, fetchChannel } from '../../store/channel.js';

function ChatBoxHeader() {
  const channels = useSelector(state => state.channel.channels)
  const {channelId} = useParams()
  const dispatch = useDispatch()
  
 
  return (
    <>
        <div className='chat-container'>
            <div className='left-container'>
          {channels && Object.values(channels)?.map((channel) => channelId == channel.id && <h4><strong>#{channel.name}</strong></h4>)}
                  
            </div>
        </div>
    </>

  )
}

export default ChatBoxHeader