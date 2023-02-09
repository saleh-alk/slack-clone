import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams, Link } from 'react-router-dom';
import { createChannel, destroyChannel, fetchChannels } from '../../store/channel.js';
import { fetchWorkplace, receiveWorkplace } from '../../store/currentWorkplace.js';
import Navigation from '../Navigation/index.js';
import ChannelModal from './ChannelModal.js';
import ChannelEditModal from './ChatEditModal.js';
import SubscriptionModal from './SubscriptionModal.js';
import { BsPlusCircle } from 'react-icons/bs'

function Sidebar() {

    
    const currentUserId = useSelector(state => state.session.user.id);

    const channels = useSelector(state => state.channel.channels)
    const {workplaceId, channelId} = useParams()
    const [show, setShow] = useState(false)
    const [isActive, setIsActive] = useState(false)
   
    
    const [showSubscription, setSubscriptionShow] = useState(false)

    
  

    const workplace = useSelector(state => state.currentWorkplace.workplace)

    
    

    const dispatch = useDispatch();
    const history = useHistory()
    
    
    
    const handleWorkplace = (e) => {
        e.preventDefault()
        history.push('/workplace')

    }

    const changeClass = (e) => {
        e.preventDefault()
        setIsActive(!isActive)
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
                <div className = "workplace-button" onClick={handleWorkplace}>{workplace ? workplace.name : <></>}</div>
            </div>
            <div className="side-channel-title">
                
            </div>
            <div className="side-channel-title">
                 <div className='channel-title-header'>Channel</div>
                         
                

            </div>
            <div className="side-channels">
                <div className="side-channel-list" >
                    
                    
                          {channels ? Object.values(channels).map(({ id, name, isPrivate, ownerId }) => (
                              <div className={channelId == id ? "selected-channel" : "channel-links"} key={id}>
                                  <div classname="stuff"> <Link className={channelId == id ? "selected-channel" : "channel-links"} to={currentUserId ? `/${workplaceId}/channels/${id}` : '/login'}>
                                      <i class="fa-solid fa-hashtag"></i>   {name}
                                  </Link></div>
                                  
                              </div>
                               
                          )) : <></>}

                        
                    

                </div>
                <div className="add-more-channels" onClick={() => setShow(true)}><i class="fa-solid fa-plus"></i>Add a Channel</div>
                          <ChannelModal onClose={() => setShow(false)} show={show} />

            </div>
            
                  </div>
              </div>
                <br></br>
              <div className="add-more-people" onClick={() => setSubscriptionShow(true)}><i class="fa-solid fa-plus"></i> Add teammates</div>
              
              <SubscriptionModal onClose={() => setSubscriptionShow(false)} showSubscription={showSubscription} />
              <div className="bottom"></div>                
         
        </div>


      </>
  )
}

export default Sidebar;