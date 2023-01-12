import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import * as workplaceActions from '../../store/workplace'
import * as subscriberActions from '../../store/workplaceSubscriber'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import './Messages.css';



function CreateWorkplace(){

    const sessionUser = useSelector(state => state.session.user.id);
    const history = useHistory()


    const dispatch = useDispatch();
    const [name, setName] = useState()
    const [url, setUrl] = useState("none")
    
    const [channel, setChannel] = useState()
    const [errors, setErrors] = useState([]);
    
  
    const handleSubmit = (e) => {
        e.preventDefault();
        
        

        dispatch(workplaceActions.createWorkspace({ name, url, sessionUser }))
            .catch(async (res) => {
                let data;
                
                try {
                    data = await res.clone().json();
                    
                } catch {
                    data = await res.text(); 
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
                
            })
            

            history.push("/workplace")
    }



    return(
    

            <div className='p-client_container'>
               
                    <div className='p-workspace-layout'>
                            <div className='p-top_nav'></div>
                            
                    <div className='form-for-create-workplace'> 
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

                            {/* <label> Url
                                <input
                                    type="text"
                                    placeholder='Url'
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />

                            </label> */}

                            {/* <label>
                                What are you working on right now?
                                <input
                                    type="text"
                                    placeholder='sales'
                                    value={channel}
                                    onChange={(e) => setChannel(e.target.value)}
                                    required
                                />
                            </label> */}
                        <button type="submit">Create Workplace </button> 
                        </form>
                </div>
                            
                    </div>
                    
              

            </div>
                
       

           
        
    )
}

export default CreateWorkplace;