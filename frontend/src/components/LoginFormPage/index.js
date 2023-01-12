import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import './LoginForm.css';
import slackLogo from './icon.png'
// import slackLogo from './slack-logo.png'


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [demoCredential, setDemoCredential] = useState('demo@user.io');
    const [demoPassword, setDemoPassword] = useState('password');


    if (sessionUser) return <Redirect to="./workplace" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const handleDemo =(e) => {
        e.preventDefault();
        setErrors([]);
   
        return dispatch(sessionActions.login({ credential: demoCredential, password: demoPassword }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });


    }

    return (
        
        <>
        <body>
                <div className='get-started-app-root'>
                    <header className='p-refreshed_page__header'>
                        <div className='left-col'></div>
                        <div className='center-col'>
                            <a>
                                <img alt='Slack' height="75" src={slackLogo}></img>
                            </a>
                        </div>
                        <div className='right-col'>
                            <div className='p-refreshed_page__header_sidelink'>
                                New to Slack?
                            </div>
                            <br></br>
            
                            <Link to="/signup" className='c-link bold'>Create an account</Link>
                            
                        </div>
                    </header>
                    <div className='p-refreshed_page'>
                        <h1 className='p-refreshed_page__heading'>Sign in to Khakis</h1>
                        <div className='p-refreshed_page__sub_heading'>
                            We suggest using the <strong>email address you use at work</strong>
                        </div>
                        <div className='p-get_started_signin'>
                            <div className="p-refreshed_page">
                            <form onSubmit={handleSubmit}>
                                <ul>
                                    {errors.map(error => <li key={error}>{error}</li>)}
                                </ul>
                                <div class="p-get_started_email_form">
                                
                                    
                                    <input
                                        type="text"
                                        placeholder='name@name.com'
                                        value={credential}
                                        onChange={(e) => setCredential(e.target.value)}
                                        required
                                    />
                                    
                                    <input
                                        type="password"
                                        placeholder='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                <button type="submit">Sign In With Email</button>
                                
                            </div>
                            </form>
                            <form onSubmit={handleDemo}>
                                <button type='submit'>Demo User</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
        </body>
        </>
    );
}

export default LoginFormPage;