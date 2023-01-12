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
        <div className='channel-title'>
          <div></div>
          <div className='channel-title-display'>
            {channels && Object.values(channels)?.map((channel) => channelId == channel.id && <div className='channel-header-message'><strong>#{channel.name}</strong></div>)}      
          </div>
          <div className='channel-title-dropdown'>

          </div>
        </div>
    </>

  )
}

export default ChatBoxHeader