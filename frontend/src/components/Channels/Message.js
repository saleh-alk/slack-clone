import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { destroyMessage, removeMessage } from '../../store/messages';
import * as sessionActions from '../../store/session';


function Message(props) {

  const dispatch = useDispatch()
 

  const deleteMessage = (e) => {
    e.preventDefault()

    dispatch(destroyMessage(props.message.id))

  }

  const convertDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  }

  return (
    
        <div className='message-sent'>

          <div>
            <div className='message-rec'>
                <div className='message-sent-username'><strong>{props.message.user} </strong></div>
                <div className='sent-time'>   {convertDate(props.message.createdAt)}</div>
            </div>
            <div className='body-text'>{props.message.body}</div>
          </div>
            

          <div className='edit-delete'><div className='delete-message-button' onClick={deleteMessage}><i class="fa-solid fa-trash"></i></div></div>
      
        </div>
  
  )
}

export default Message