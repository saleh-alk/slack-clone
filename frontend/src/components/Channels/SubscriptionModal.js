import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createChannel } from '../../store/channel'
import { receiveUser } from '../../store/session'
import { fetchUser, receiveNewUsers } from '../../store/user'
import { createWorkspaceSubscriber } from '../../store/workplaceSubscriber'



function SubscriptionModal(props) {
    const dispatch = useDispatch()
    const { workplaceId } = useParams()
    const [name, setName] = useState("")
    const [isPrivate, setIsPrivate] = useState(true)
    const ownerId = useSelector(state => state.session.user.id);
    // const user = useSelector(receiveUser())
    // const users = useSelector()
    
    

    if (!props.showSubscription) {
        return null
    }
 

    const handleSubmit = (e) => {
        e.preventDefault();
    
        //dispatch(createSubscriber({ ownerId, name, isPrivate, workplaceId }))
        
        dispatch(createWorkspaceSubscriber({username: name, workplaceId }))
        props.onClose()
    }


  return (
      <div className='modal'>


          <div className='modal-content'>
              <button onClick={props.onClose}>close</button>
              <form onSubmit={handleSubmit}>
                  <label> Username
                      <input
                          type="text"
                          placeholder='demo-lition'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                  </label>
                  <button type="submit" className='close-channel-modal' >Submit</button>
              </form>

                <div className='all-users'>
                    
                </div>
          </div>


      </div>
  )
}

export default SubscriptionModal