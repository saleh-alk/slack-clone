import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as workplaceActions from '../../store/workplace';
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom";
import slackLogo from '../LoginFormPage/slack-logo.png'
import './Workplace.css';
import WorkplaceDetail from './workplaceDetail';






function Workplace() {
    
    const dispatch = useDispatch();
    const [workplace, setWorkplace] = useState()
    const [subscribers, setSubscribers] = useState()


    const fetchWorkplaces = () => async (dispatch) => {
        const res = await fetch("/api/workplaces")

        if (res.ok) {
            const workplaces = await res.json()
            //dispatch(receiveWorkplaces(workplaces))
            setWorkplace(workplaces)
        }
    }

    const fetchSubscribers = () => async (dispatch) => {
        const res = await fetch("/api/workplace_subscriptions")

        if (res.ok) {
            const subscriber = await res.json()
            //dispatch(receiveWorkplaces(workplaces))
            setSubscribers(subscriber)
        }
    }
    
    
    
    const sessionUser = useSelector(state => state.session.user);
    const workplaces = useSelector(workplaceActions.receiveWorkplaces)
   

    useEffect(() => {
        dispatch(fetchWorkplaces())
        dispatch(fetchSubscribers())
        
    }, [])

    
    return  (
        <>
        {/* <body className='full_height get_started'> */}
        
        
            <div className='get_started_app_root'>
                <header className="p-refreshed_page__header">
                    <div className="left-col"> {console.log(sessionUser)}</div>
                    <div className="center-col">
                        <Link to={"/"}><img src={slackLogo} height="75"></img></Link>
                    </div>
                    <div className="right-col"></div>
                </header>

                <div className='p-refreshed_page'>
                    <h1 className='p-workspaces_view__heading p-refreshed_page__heading'>
                        <span className='p-workspaces_view__heading--aubergine'>Welcome back! </span>
                    </h1>
                    <div className="p-refreshed_page__sub_heading p-workspaces_view__subheading">
                        Choose a workspace below to get back to working with your team. {console.log(workplace)}
                    </div>
                </div>

                <div className="p-workspaces_view__container">
                   <section>
                        <div className='p-workspaces_list__panel'>
                            <div className='p-workspaces_list__panel'>
                                <h2>{console.log(sessionUser.id)}</h2>
                                {/* <h2>{console.log(workplace)}</h2> */}
                                <h2>{subscribers ? subscribers.map((subscriber) => 
                                subscriber.userId === sessionUser.id ?
                                console.log(subscriber.workplaceId) : console.log("") ) : <></>}</h2>
                                <h4> Workplaces for <strong>{ sessionUser.email}</strong>
                                </h4>
                                
                            </div>
                        <div className='p-expanding_workspace_list'>
                            <div className='p-expanding_workspace_list__header'></div>
                            <div className='p-expanding_workspace_list__workspaces p-expanding_workspace_list__workspaces--no_toggle'>
                                    {subscribers ? subscribers.map((subscriber, i) =>
                                        subscriber.userId === sessionUser.id ?
                                          <WorkplaceDetail work={workplace[subscriber.workplaceId]} key={i} /> : console.log("")) : <></>}
                                    

                                    {workplace ? workplace.map((work, i) =>
                                        work.adminId === sessionUser.id ?
                                            <WorkplaceDetail work={work} key={i} /> : console.log("")) : <></>}
                    

                

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