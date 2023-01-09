import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createChannel, destroyChannel, fetchChannels } from '../../store/channel.js';
import './Channel.css';

function ChannelsIndex() {
    const [name, setName] = useState('');
    const currentUserId = useSelector(state => state.session.user.id);
    // const channels = useSelector(state => Object.values(state.channels));
    const dispatch = useDispatch();
    const [channels, setChannels] = useState("")
    const [ isPrivate, setPrivate] = useState(false)

    

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

    const createNewChannel = e => {
        e.preventDefault();
        dispatch(createChannel({ ownerId: currentUserId, name: name, private: isPrivate }));
        setName('');
    }

    return (

        
        <body>
            
            {/* <div className='p-client_container'>
                <div className='p-client'>
                    <div className='p-workspace-layout'>
                        <div className='p-top_nav'>

                        </div>
                    </div>
                </div>

            </div> */}
        <section className='channels-index home-section'>
            <h1>channels</h1>
            <ul>
                {channels ? channels.map(({ id, name, isPrivate, ownerId }) => (
                    <li key={id}>
                        <NavLink to={currentUserId ? `/channels/${id}` : '/login'}>
                            {name}
                        </NavLink>
                        {ownerId === currentUserId ? (
                            <button
                                className='btn-delete'
                                onClick={() => dispatch(destroyChannel(id))}
                            >
                                Delete
                            </button>
                        ) : <></>}
                    </li>
                )) : <></>}
            </ul>
            {!!currentUserId &&
                <form onSubmit={createNewChannel}>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button className='btn-primary' disabled={!name}>
                        Create Channel
                    </button>
                </form>
            }
        </section >
        </body>
        
    );
}

export default ChannelsIndex;