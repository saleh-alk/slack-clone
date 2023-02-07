import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { createChannel, destroyChannel, fetchChannels, fetchChannel } from '../../store/channel.js';
import ChannelDetailModal from './ChannelDetailModal.js';
import SubscriptionModal from './SubscriptionModal.js';




function ChatBoxHeader() {
  const channels = useSelector(state => state.channel.channels)
  const {channelId} = useParams()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [showSubscription, setSubscriptionShow] = useState(false)
  


  
 
  return (
    <>
        <div className='channel-title'>
          {/* <div></div> */}
        <div className='channel-title-display' onClick={() => setShow(true)}>
          {channels && Object.values(channels)?.map((channel) => channelId == channel.id && <div className='channel-header-message'><strong><i class="fa-solid fa-hashtag"></i> {channel.name}  </strong><i class="fa-solid fa-angle-down"></i></div>)}      
          </div>
        <ChannelDetailModal onClose={() => setShow(false)} show={show} />
          {/* <div className='channel-title-dropdown'>

          </div> */}
          <div className='people-stuff'>
            <div>
            <i class="fa-solid fa-user" onClick={() => setShow(true)}></i>
            </div>
            
            <div>
            <i class="fa-solid fa-user-plus" onClick={() => setSubscriptionShow(true)}></i>
              
            <SubscriptionModal  onClose={() => setSubscriptionShow(false)} showSubscription={showSubscription} />
            </div>
          

          </div>
        </div>
    </>

  )
}

export default ChatBoxHeader