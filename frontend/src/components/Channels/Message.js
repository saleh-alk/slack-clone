import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';


function Message(message) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    const [users, setUser] = useState("")

    const fetchUsers = () => async (dispatch) => {
        const res = await fetch("/api/users")

        if (res.ok) {
            const users = await res.json()
            setUser(users)
        }
    }

    useEffect(()=>{
        dispatch(fetchUsers())
    }, [])



  return (
    <li>
        <div className='message-sent'>
            <div className='message-sent-username'><strong>{users ? users.map(user => user.id === message.message.userId ? user.username : console.log("")) : <></>} </strong></div>
            <div className='body-text'>{message.message.body}</div>
            <div className='sent-time'> sent at {message.message.createdAt}</div>
        </div>
    </li>
  )
}

export default Message