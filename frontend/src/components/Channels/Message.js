import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';


function Message(props) {
 

  return (
    <li>
        <div className='message-sent'>
            
            <div className='message-sent-username'><strong>{props.message.user} </strong></div>
            <div className='body-text'>{props.message.body}</div>
            <div className='sent-time'> sent at {props.message.createdAt}</div>
        </div>
    </li>
  )
}

export default Message