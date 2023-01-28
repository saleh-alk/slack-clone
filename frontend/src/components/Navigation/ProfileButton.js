import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/login")

    };

    return (
        <>
            <div className="profile-button"  onClick={openMenu}>
                <i class="fa-solid fa-p"></i>
            </div>
            {showMenu && (

                <div className="profile-main-box">
                    <div className="profile-username"><strong>{user.username}</strong></div>

                    <div className="Logout" onClick={logout}> <strong>Sign Out</strong></div>

                    {/* <button onClick={logout}>Log Out</button> */}


                </div>
                // <ul className="profile">
                //     <li>{user.username}</li>
                //     <li>{user.email}</li>
                //     <li>
                //         <button onClick={logout}>Log Out</button>
                //     </li>
                // </ul>
            )}
        </>
    );
}

export default ProfileButton;