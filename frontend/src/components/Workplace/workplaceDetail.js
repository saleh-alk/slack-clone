import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as currentWorkplaceActions from '../../store/workplace';
import * as sessionActions from '../../store/session';
import { Link, Redirect, useHistory } from "react-router-dom";
import slackLogo from '../LoginFormPage/icon.png'
// import slackLogo from '../LoginFormPage/slack-logo.png'
import arrow from '../LoginFormPage/arrow.png'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import * as workplaceActions from '../../store/workplace';

import './Workplace.css';
import { clearMessage } from '../../store/messages';


function WorkplaceDetail(props) {

    const sessionUser = useSelector(state => state.session.user);


    const dispatch = useDispatch()
    const history = useHistory()

    



    const onClick = () => {

        if(props.workplace.id){
        dispatch(clearMessage())
        dispatch(currentWorkplaceActions.fetchWorkplace(props.workplace.id)).then((workplace)=> {

            
            
        })
        if(props.workplace.id){
            history.push(`/messaging/${props.workplace.id}/channels/${props.workplace.firstChannel}`)
        }
        
        } 
    }

    

    const deleteClick = () => {
        if(props.workplace.id){
            dispatch(currentWorkplaceActions.destroyWorkplace(props.workplace.id))
            
        }
    }




    return (
        <>
            

            <a className='c-link .p-workspaces_list__link'>
                <div className='p-workspace_info'>
                    <div className='p-workspace_info__icon'>
                        <img src={slackLogo} height="25"></img>
                        
                        <div className='icon-name'>khakis</div>
                    </div>
                    <div className='p-workspace_info__content'>
                        <div className='p-workspace_info__title'>
                            {props.workplace.name}
                        </div>
                    </div>
                    <div className='p-workspace_info__action'>
                        <span className='p-workspaces_list__link_icon_text'>
                            Open
                        </span>
                        <button className="add-workplace-button" onClick={onClick}><BsFillArrowRightCircleFill /></button>
                        <button className='add-workplace-button' onClick={deleteClick}>delete</button>

                    </div>
    
                    <hr className='p-workspaces_list__workspaces_list_divider'></hr>
                </div>
            </a>
        </>
    )
}

export default WorkplaceDetail;