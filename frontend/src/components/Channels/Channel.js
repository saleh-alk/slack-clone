import React from 'react'
import ChatBoxHeader from './ChatBoxHeader'
import ChatMessages from './ChatMessages'
import SideBar from './Sidebar'

function Channel() {
  return (
    <div className='main-container'>
        <SideBar />
        <ChatMessages />
        

    </div>
  )
}

export default Channel