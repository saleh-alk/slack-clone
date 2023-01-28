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
    const workplace = useSelector(state => state.currentWorkplace.workplace)
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
              <div className='edit-channel-desc'>
                
                  <div className='edit-name'>Add a teammate to the {workplace ? workplace.name : <></>}  workplace </div>
                  <div onClick={props.onClose} className="close-modal"><i class="fa-solid fa-x"></i></div>
              </div>
              <form onSubmit={handleSubmit}>
                  <label>
                      <input
                          type="text"
                          placeholder='Demo2'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                  </label>

                  <button type="submit" className='close-channel-modal' disabled={!name}>Send</button>
              </form>

          </div>


      </div>
  )
}

export default SubscriptionModal