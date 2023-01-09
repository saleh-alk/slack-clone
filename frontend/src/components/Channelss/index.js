import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';



function Channel() {

    const dispatch = useDispatch();
    const [channel, setChannel] = useState("h")
   return (
    <>
    
      <div>{console.log(channel)}</div>

     </>
  )
}

export default Channel