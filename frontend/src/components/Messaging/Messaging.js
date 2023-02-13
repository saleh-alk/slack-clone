import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams, Link } from 'react-router-dom';
import { fetchWorkplace, receiveWorkplace } from '../../store/currentWorkplace.js';
import { createChannel, destroyChannel, fetchChannels } from '../../store/channel.js';
import * as messageActions from '../../store/messages'
import ChannelModal from '../Channels/ChannelModal';
import ChannelEditModal from '../Channels/ChatEditModal';
import SubscriptionModal from '../Channels/SubscriptionModal'
import ChannelDetailModal from '../Channels/ChannelDetailModal.js';
import Message from "../Channels/Message"
import MessageBox from '../Channels/MessageBox';
import Navigation from '../Navigation'
import ProfileButton from '../Navigation/ProfileButton'
import './Messaging.css'
import ProfileInfo from './ProfileInfo.js';

function Messaging() {

    const currentUserId = useSelector(state => state.session.user.id);

    const channels = useSelector(state => state.channel.channels)
    const { workplaceId, channelId } = useParams()
    const [show, setShow] = useState(false)
    const [detailShow, setDetailShow] = useState(false)
    
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()
    const [showProfile, setShowProfile] = useState(false)

    const [showSubscription, setSubscriptionShow] = useState(false)
    const workplace = useSelector(state => state.currentWorkplace.workplace)
    const m = useSelector(messageActions.getMessages(+channelId))
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) { <Redirect to={"./login"} /> }



    useEffect(() => {
        dispatch(fetchChannels(workplaceId));
        dispatch(fetchWorkplace(workplaceId))

    }, [workplaceId]);

    useEffect(() => {
        dispatch(messageActions.fetchMessages(channelId))
        return () => dispatch(messageActions.clearMessage())

    }, [dispatch, channelId, workplaceId])

  return (
    <div className='everything'>
    <div className='messaging-main'>
        <div className='top-header-messaging'>
              <div >k</div>
                <div className='profile-button-messaging' >
                    {/* <Navigation onClose={() => setShowProfile(false)} profile={showProfile}/> */}
                    <div className="nav-login-button" onClick={() => setShowProfile(true)} >
                    <ProfileButton user={sessionUser} />
                
                  <ProfileInfo user={sessionUser} showProfile={showProfile} onClose={() => setShowProfile(false)} />
               
                </div>
               
                      
                    
                  </div>
        </div>

        <div className='messaging-content'>
                  
            <div className='sidebar-messaging'>
                <div className='workspace-name-messaging'>
                      {workplace ? workplace.name : <></>}
                </div>

                <div className='channel-messaging-list'>
                    <div className='channel-title-header'>
                        Channel
                    </div>
                    <div className='channel-list-messaging'>
                          {channels ? Object.values(channels).map(({ id, name, isPrivate, ownerId }) => (
                              <div className={channelId == id ? "selected-channel" : "channel-links"} key={id}>
                                  <div classname="stuff"> <Link className={channelId == id ? "selected-channel" : "channel-links"} to={currentUserId ? `/messaging/${workplaceId}/channels/${id}` : '/login'}>
                                      <i class="fa-solid fa-hashtag"></i>   {name}
                                  </Link></div>

                              </div>

                          )) : <></>}

                     </div>

                        <div className="add-more-channels" onClick={() => setShow(true)}><i class="fa-solid fa-plus"></i>Add a Channel</div>
                        <ChannelModal onClose={() => setShow(false)} show={show} />

                  

                    </div>
                    <div>
                      <br></br>
                      <div className="add-more-people" onClick={() => setSubscriptionShow(true)}><i class="fa-solid fa-plus"></i> Add teammates</div>

                      <SubscriptionModal onClose={() => setSubscriptionShow(false)} showSubscription={showSubscription} />
                      <div className="bottom"></div>              
                    </div>

            </div>
          
            <div className='chatbox-messaging'>
            
                    <div className='chatbox-header-messaging' onClick={() => setDetailShow(true)}>
                         {channels && Object.values(channels)?.map((channel) => channelId == channel.id && <div className='channel-header-message'><strong><i class="fa-solid fa-hashtag"></i> {channel.name}  </strong><i class="fa-solid fa-angle-down"></i></div>)}  
                         <div>
                             
                        </div>  
                      <div className='people-stuff-messaging'>
                          <div>
                              <i class="fa-solid fa-user" onClick={() => setDetailShow(true)}></i>
                          </div>

                          <div>
                              <i class="fa-solid fa-user-plus" onClick={() => setSubscriptionShow(true)}></i>

                          </div>
                      </div>  
              
                    </div>

                  <ChannelDetailModal onClose={() => setDetailShow(false)} show={detailShow} />
            

                    <div className='messages-messaging'>
                        <div className='message-receipt-messaging'>
                          {m.map((message, i) => <Message message={message} key={i} />)}

                        </div>
                        <div className='intro-message-messaging'>
                          <div>This is the very begining of the&nbsp; </div> {channels && Object.values(channels)?.map((channel) => channelId == channel.id && <strong><div> {channel.name}&nbsp; </div></strong>)} channel. 
                        </div>

                    </div>
                    <div className='message-input-messaging'>
                      <MessageBox />
                    </div>
                    
            </div>
                  {/* <ProfileInfo user={sessionUser} showProfile={showProfile} onClose={()=> setShowProfile(false)} /> */}


            
        </div>

    </div>
    </div>
  )
}

export default Messaging