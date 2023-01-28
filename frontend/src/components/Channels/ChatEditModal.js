import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchChannels, updateChannel } from '../../store/channel'

const ChatEditModal = props => {

    const dispatch = useDispatch()
    const { workplaceId, channelId } = useParams()
    const [name, setName] = useState("")
    const [isPrivate, setIsPrivate] = useState(true)
    const ownerId = useSelector(state => state.session.user.id);
    const history = useHistory()
    
    if (!props.editShow) {
        return null
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateChannel({ channelId, ownerId, name, isPrivate, workplaceId }))
        
        dispatch(fetchChannels(workplaceId))
        props.onClose()
    }


    return (
        <div className='modal'>


            <div className='modal-content'>
                <div className='edit-channel-desc'>
                    <div className='edit-name'>Channel Name</div>
                    <div onClick={props.onClose} className="close-modal"><i class="fa-solid fa-x"></i></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <label> 
                        <input
                            type="text"
                            placeholder='General'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" className='close-channel-modal' >Save</button>
                </form>

            </div>


        </div>
    )
}

export default ChatEditModal