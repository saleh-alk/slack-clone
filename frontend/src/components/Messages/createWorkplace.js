import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import * as workplaceActions from '../../store/workplace'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import './Messages.css';



function CreateWorkplace(){

    const sessionUser = useSelector(state => state.session.user.id);
    const currentWorkplace = useSelector(state => state.workplace)
    
    const dispatch = useDispatch();
    const [name, setName] = useState()
    const [url, setUrl] = useState()
    
    const [channel, setChannel] = useState()
    const [errors, setErrors] = useState([]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        

        return dispatch(workplaceActions.createWorkspace({ name, url, sessionUser }))
            .catch(async (res) => {
                let data;
                console.log(res)
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                    console.log(data)
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                    console.log(data)
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
                

            });
    }


    return(
    
        <body>
            {/* <div style="position:absolute"></div> */}

            <div className='p-client_container'>
                <div className='p-client p-client--toggle-larger-top-nav-bar p-client--a11y-layout'>
                    <div className='p-workspace-layout'>
                            <div className='p-top_nav'></div>
                            {/* <div className='p-workspace__sidebar p-workspace__sidebar--tiny p-workspace__sidebar--with-transparent-resizer' ></div>
                            <div className='p-flexpane__preview-mode-overlay hidden'></div> */}
                            {/* <div className='p-workspace__channel_sidebar'></div> */}

                        <form onSubmit={handleSubmit}>
                            <label>
                                What do you want to call this workplace?
                                
                                <input
                                    type="text"
                                    placeholder='Marketing Program'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>

                            <label> Url
                                <input
                                    type="text"
                                    placeholder='Url'
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />

                            </label>

                            <label>
                                What are you working on right now?
                                <input
                                    type="text"
                                    placeholder='sales'
                                    value={channel}
                                    onChange={(e) => setChannel(e.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit">Create Workplace</button>
                        </form>
                            
                    </div>
                    
                </div>

            </div>
                
        </body>

           
        
    )
}

export default CreateWorkplace;