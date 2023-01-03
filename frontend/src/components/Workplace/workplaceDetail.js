import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as workplaceActions from '../../store/workplace';
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom";
import slackLogo from '../LoginFormPage/slack-logo.png'
import arrow from '../LoginFormPage/arrow.png'

import './Workplace.css';


function WorkplaceDetail(work) {


    return (
        <>
            <a className='c-link .p-workspaces_list__link'>
                <div className='p-workspace_info'>
                    <div className='p-workspace_info__icon'>
                        <img src={slackLogo} height="30"></img>
                    </div>
                    <div className='p-workspace_info__content'>
                        <div className='p-workspace_info__title'>
                            {work.work.name}
                        </div>
                    </div>
                    <div className='p-workspace_info__action'>
                        <span className='p-workspaces_list__link_icon_text'>
                            Open
                        </span>
                        <img src={arrow} height="25" className='c-icon c-icon--arrow-right-medium'>
                        </img>
                    </div>
    
                    <hr className='p-workspaces_list__workspaces_list_divider'></hr>
                </div>
            </a>
        </>
    )
}

export default WorkplaceDetail;