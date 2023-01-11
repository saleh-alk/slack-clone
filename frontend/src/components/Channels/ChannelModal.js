import React from 'react'

const ChannelModal = props => {
    if (!props.show){
        return null
    }
  return (
    <div className='modal'>
         
        <div className='modal-content'>
              <button onClick={props.onClose} className='close-channel-modal' >X</button>
    
        </div>

        
    </div>
  )
}

export default ChannelModal