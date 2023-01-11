import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { createChannel, destroyChannel, fetchChannels } from '../../store/channel.js';
import ChannelModal from './ChannelModal.js';

function Sidebar() {

    
    const currentUserId = useSelector(state => state.session.user.id);

    const channels = useSelector(state => state.channel.channels)
    const {workplaceId, channelId} = useParams()
    const [show, setShow] = useState(false)

    const dispatch = useDispatch();
    


   
   

    useEffect(() => {
        dispatch(fetchChannels(workplaceId));
    }, [workplaceId]);

  return (
    <>
    <div className='p-workspace__channel_sidebar'>
        <div className='p-ia__sidebar_header p-ia__sidebar_header--top-nav p-ia__sidebar_header--ia_details_popover'>
            <h4>Workplace</h4>
            <button className='c-button-unstyled p-channel_sidebar__compose_button'>
                    Create New
            </button>
        </div>


    </div>

    <div className='c-virtual_list c-virtual_list--scrollbar p-channel_sidebar__static_list c-scrollbar c-scrollbar--hidden'>
        <br></br>
        <br></br>
        <div className='channel-header'>
            <h3 className='channel-title'>Channel </h3>
            <button className='create-channel' onClick={() => setShow(true)}>+</button>
                <ChannelModal onClose={() => setShow(false)} show={show} />
        </div>
            

              {channels ? Object.values(channels).map(({ id, name, isPrivate, ownerId }) => (
                  <li key={id}>
                      <NavLink className="channel-links" to={currentUserId ? `/${workplaceId}/channels/${id}` : '/login'}>
                          # {name}
                      </NavLink>
                      
                  </li>
              )) : <></>}
              

    </div>
          

      </>
  )
}

export default Sidebar