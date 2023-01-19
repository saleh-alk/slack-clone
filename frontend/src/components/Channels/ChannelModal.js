import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createChannel } from '../../store/channel'

const ChannelModal = props => {

    const dispatch = useDispatch()
    const {workplaceId} = useParams()
    const [name, setName] = useState("")
    const [isPrivate, setIsPrivate] = useState(true)
    const ownerId = useSelector(state => state.session.user.id);
    if (!props.show){
        return null
    }
   

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createChannel({ownerId, name, isPrivate, workplaceId}))
    props.onClose()
  }


  return (
    <div className='modal'>
      
         
        <div className='modal-content'>
        <button onClick={props.onClose}>close</button>
          <form onSubmit={handleSubmit}>
            <label> Channel Name
              <input
                type="text"
                placeholder='General'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
            />
          </label>

              <button  type="submit" className='close-channel-modal' >Edit</button>
          </form>
    
        </div>

        
    </div>
  )
}

export default ChannelModal