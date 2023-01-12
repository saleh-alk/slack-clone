import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navigation from '../Navigation'
import './Channel.css'

function Header() {


  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser){ <Redirect to={"./login"} />}


  return (
   <>
        
            
    <div className='p-workspace-layout'>
        <div className='p-top_nav'>
            <div className='p-top_nav__sidebar'></div>
            <div className='p-top_nav__search__container'></div>
            <div className='p-top_nav__right  '><Navigation/></div>
        </div>
    </div>
          
    

    
   </>
    
  )
}

export default Header