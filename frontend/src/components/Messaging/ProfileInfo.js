import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';


const ProfileInfo = props => {


    const dispatch = useDispatch();
    const history = useHistory()
  

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/login")

    };

    useEffect(() => {
        if (!props.showProfile) return;

        const closeMenu = () => {
            props.onClose()
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [props.showProfile]);
    if (!props.showProfile) {
        return null

    }

    return (
        <>
            <div className="profile-main-box">
                <div className="profile-username"><strong>{props.user.username}</strong></div>

                <div className="Logout" onClick={logout}> <strong>Sign Out</strong></div>

                {/* <button onClick={logout}>Log Out</button> */}
            </div>
        </>
    )


}

export default ProfileInfo