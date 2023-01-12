import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { createChannel, destroyChannel, fetchChannels } from '../../store/channel.js';
import { fetchWorkplace } from '../../store/currentWorkplace.js';
import Navigation from '../Navigation/index.js';
import ChannelModal from './ChannelModal.js';
import SubscriptionModal from './SubscriptionModal.js';

function Sidebar() {

    
    const currentUserId = useSelector(state => state.session.user.id);

    const channels = useSelector(state => state.channel.channels)
    const {workplaceId, channelId} = useParams()
    const [show, setShow] = useState(false)
    const [showSubscription, setSubscriptionShow] = useState(false)
    const workplace = useSelector(state => state.currentWorkplace)
    

    const dispatch = useDispatch();
    const history = useHistory()
    
    
    
    const deleteChannel = (e) => {
        e.preventDefault()
        dispatch(destroyChannel(channelId))

    }
   

    useEffect(() => {
        dispatch(fetchChannels(workplaceId));
        dispatch(fetchWorkplace(workplaceId))
    }, [workplaceId]);

  return (
    <>
        <div className="side-main">
            <div className="inner-container">
            <div className="channel-contaier"> 
            <div className="side-header">
                <div>Workplace</div>
            </div>
            <div className="side-channel-title">
                
            </div>
            <div className="side-channel-title">
                 <div className='channel-title-header'>Channel</div>
                 <button className='delete-channel' onClick={deleteChannel}>-</button>
                <div className="add-more-channels" onClick={() => setShow(true)}><button className='add-channel'>+</button></div>
                <ChannelModal onClose={() => setShow(false)} show={show} />
                

            </div>
            <div className="side-channels">
                <div className="side-channel-list">
                    <div className="hashtag"></div>
                    <div>
                          {channels ? Object.values(channels).map(({ id, name, isPrivate, ownerId }) => (
                              <div key={id}>
                                  <NavLink className="channel-links" to={currentUserId ? `/${workplaceId}/channels/${id}` : '/login'}>
                                      #   {name}
                                  </NavLink>
                                  
                              </div>
                               
                          )) : <></>}
                    </div>

                </div>

            </div>
            
                  </div>
              </div>
                <br></br>
              <div className="add-more-people">Add by Username</div>
              <div className="add-more-channels" onClick={() => setSubscriptionShow(true)}><button className='add-channel username-add-button'>+</button></div>
              <SubscriptionModal onClose={() => setSubscriptionShow(false)} showSubscription={showSubscription} />
              <div className="bottom"></div>                
         
        </div>


      </>
  )
}

export default Sidebar;