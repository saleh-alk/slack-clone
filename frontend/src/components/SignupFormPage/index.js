import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom";
import slackLogo from '../LoginFormPage/icon.png'
// import slackLogo from '../LoginFormPage/slack-logo.png'
import './Signup.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
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
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <body className="full_height get_started">
            <div className="get_started_app_root">
                <header className="p-refreshed_page__header">
                    <div className="left-col"></div>
                    <div className="center-col sign-in-icon">
                        <Link to={"/"}><img src={slackLogo} height="50"></img></Link>
                        <div className='icon-name-header'>khakis</div>
                    </div>
                    <div className="right-col"></div>
                </header>
                <div className="p-refreshed_page">
                    <h1 className="p-refreshed_page__heading">Enter your email and password</h1>
                    <div className="p-refreshed_page__sub_heading">
                        We suggest using the <strong>email address you use at work.</strong>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                        
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email"
                            />
                        
                        
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Username"
                            />
                
               
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                
            
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm Password"
                            />
        
                        <button type="submit">Sign Up</button>
                        <div className="p-creator_signup_form__sign_in_existing_workspaces">
                            <div className="p-creator_signup_form__sign_in_existing_workspaces">
                                Already using Khakis?
                                <Link to="/login">Sign in to an existing workplace</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            </body>
    );
}

export default SignupFormPage;