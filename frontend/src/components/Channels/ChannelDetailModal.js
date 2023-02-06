import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { destroyChannel, fetchChannels } from '../../store/channel'
import { fetchSubscribers, fetchWorkplaceSubscribers } from '../../store/workplaceSubscriber'

import ChannelEditModal from './ChatEditModal.js';

const ChannelDetailModal = props => {
    
    const channels = useSelector(state => state.channel.channels)
    const { channelId, workplaceId } = useParams()
    const [editShow, setEditShow] = useState(false)
    const [content, setContent] = useState("About")
    const subscribers = useSelector(state => state.workplaceSubscriber.workplaceSubscriber)

    // subscribers ? console.log(subscribers.workplaceSubscription) : console.log("")
   

    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(fetchSubscribers(workplaceId))
    }, [])


    const deleteChannel = (e) => {
        e.preventDefault()
        dispatch(destroyChannel(channelId))
        dispatch(fetchChannels(workplaceId))
        props.onClose()

    }


    if (!props.show) {
        return null
    }

    let setting ;
    if(content == 'About'){
        setting = (
            <>
                <div className='channel-name' >
                    <div className='channel-name-header'><strong>Channel name</strong></div>
                    <div className='stuff-in-between'>
                        {channels && Object.values(channels)?.map((channel) => channelId == channel.id && <div className='channel-name-modal'><i class="fa-solid fa-hashtag"></i> {channel.name} </div>)}
                        <div className='edit-button-modal' onClick={() => setEditShow(true)}>Edit</div>

                        <ChannelEditModal onClose={() => setEditShow(false)} editShow={editShow} />
                    </div>
                </div>

                <div className='delete-channel-button' onClick={deleteChannel}>
                    <i class="fa-solid fa-trash"></i>
                    <div>Delete this channel</div>
                </div>
            </>
          
            
        )

    } else if (content == 'Member'){
       setting = (
           <>
        
               <div className='list-of-names'>{subscribers ? subscribers.workplaceSubscription.map((subs) => <div className='username-list'><i class="fa-solid fa-user"></i><div>{subs.user.username}</div></div>) : <></>}</div>
           </>
       )

    }




  return (
      <div className='modal'>

        
          <div className='modal-content detail-modal'>
            <div className='top-box-detail-modal'>
                
                    <div className='edit-name'> 
                      {channels && Object.values(channels)?.map((channel) => channelId == channel.id && <div className='channel-header-message'><strong><i class="fa-solid fa-hashtag"></i> {channel.name}  </strong></div>)}
                    </div>

                  
                    <div onClick={props.onClose} className="close-modal"><i class="fa-solid fa-x"></i></div>
                    
                  
              
            </div>


            <div className='navbar-for-channels'>
                  <div onClick={()=> setContent("About")}>About</div>
                  <div onClick={()=> setContent("Member")}>Members</div>
            </div>

        
              {/* <div className='channel-name' >
                  <div className='channel-name-header'><strong>Channel name</strong></div>
                  <div className='stuff-in-between'>
                    {channels && Object.values(channels)?.map((channel) => channelId == channel.id && <div className='channel-name-modal'><i class="fa-solid fa-hashtag"></i> {channel.name} </div>)}
                      <div className='edit-button-modal' onClick={() => setEditShow(true)}>Edit</div>
                      
                      <ChannelEditModal onClose={() => setEditShow(false)} editShow={editShow} />
                    </div>
              </div>

              <div className='delete-channel-button' onClick={deleteChannel}>
                  <i class="fa-solid fa-trash"></i>
                  <div>Delete this channel</div>
              </div> */}

              {setting}


          </div>


      </div>
  )
}

export default ChannelDetailModal