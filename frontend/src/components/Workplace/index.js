import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as workplaceActions from '../../store/workplace';
import * as sessionActions from '../../store/session';
import * as subscriberActions from '../../store/workplaceSubscriber';
import { Link, useParams, Redirect } from "react-router-dom";
import slackLogo from '../LoginFormPage/icon.png'
// import slackLogo from '../LoginFormPage/slack-logo.png'
import './Workplace.css';
import WorkplaceDetail from './workplaceDetail';






function Workplace() {
    
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const workplaces = useSelector(state => state.workplace)
   
   

    useEffect(() => {
        dispatch(sessionActions.receiveUser())
        dispatch(workplaceActions.fetchWorkplaces(sessionUser.id))
        
    }, [])



    if(!sessionUser) return <Redirect to={"/login"} />
    
    return  (
        <>
        {/* <body className='full_height get_started'> */}
        
        
            <div className='get_started_app_root'>
                <header className="p-refreshed_page__header">
                    <div className="left-col"> </div>
                    <div className="center-col">
                        <Link to={"/"}><img src={slackLogo} height="50"></img></Link>
                        <div className='icon-name-header'>khakis</div>
                    </div>
                    <div className="right-col"></div>
                </header>

                <div className='p-refreshed_page'>
                    <h1 className='p-workspaces_view__heading p-refreshed_page__heading'>
                        <span className='p-workspaces_view__heading--aubergine'>Welcome back! </span>
                    </h1>
                    <div className="p-refreshed_page__sub_heading p-workspaces_view__subheading">
                        Choose a workspace below to get back to working with your team. 
                    </div>
                </div>

                <div className="p-workspaces_view__container">
                   <section>
                        <div className='p-workspaces_list__panel'>
                            <div className='p-workspaces_list__panel'>
                        
                                <h4> Workplaces for <strong>{sessionUser.username}</strong>
                                </h4>
                                
                            </div>
                        <div className='p-expanding_workspace_list'>
                            <div className='p-expanding_workspace_list__header'></div>
                            <div className='p-expanding_workspace_list__workspaces p-expanding_workspace_list__workspaces--no_toggle'>
                                   
                                    {workplaces && Object.values(workplaces).map((workplace, i) => <WorkplaceDetail workplace={workplace} key={i} />)}
                                   
                            

                

                            </div>
                        </div>
                  
                        </div>
                    </section>

                    <div className='p-create_workspace_banner'>
                        <span className='align_items_center display_flex'>
                            Want to create a new team?
                        </span>
                        <Link to={"/newWorkplace"} className='c-link c-button  c-button--outline p-create_workspace_banner__button c-button--medium'>
                            Create Another Workspace
                        </Link>
        
                    </div>

                   
                </div>


            </div>
        {/* </body> */}
        </>
    )

    
}

export default Workplace;