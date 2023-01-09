import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createChannel, destroyChannel, fetchChannels } from '../../store/channel.js';

function Sidebar() {

    const [name, setName] = useState('');
    const currentUserId = useSelector(state => state.session.user.id);
    // const channels = useSelector(state => Object.values(state.channels));
    const dispatch = useDispatch();
    const [channels, setChannels] = useState("")

    const fetchChannels = () => async (dispatch) => {
        const res = await fetch("/api/channels")

        if (res.ok) {
            const channels = await res.json()
            //dispatch(receiveWorkplaces(workplaces))
            setChannels(Object.values(channels.channels))
        }
    }

    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

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
              

        <h3 className='channel-title'>Channel</h3>

              {channels ? channels.map(({ id, name, isPrivate, ownerId }) => (
                  <li key={id}>
                      <NavLink to={currentUserId ? `/channels/${id}` : '/login'}>
                          # {name}
                      </NavLink>
                      
                  </li>
              )) : <></>}
              

    </div>
          

      </>
  )
}

export default Sidebar