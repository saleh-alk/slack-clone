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

  return (
    
        <div className='message-sent'>
            
            <div className='message-sent-username'><strong>{props.message.user} </strong></div>
            <div className='body-text'>{props.message.body}</div>
            <div className='sent-time'> sent at {props.message.createdAt}</div>
            <button className='delete-message-button' onClick={deleteMessage}>x</button>
        </div>
  
  )
}

export default Message