import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { auth, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storeGuest } from './utilities';
import '../styles/nav.css';

export default function Home({ guest, guestLevel, setGuest, setGuestLevel }) {

    const [user, loading, error] = useAuthState(auth);

    const navItems = [
        {title: 'Home', link: '/', level: 0},
        {title: 'About', link: 'about', level: 0},
        {title: 'Events', link: 'events', level: 0},
        {title: 'Contact', link: 'contact', level: 0},
        {title: 'Map', link: 'map', level: 1},
        {title: 'Plotholders', link: 'plotholders', level: 2}
    ];

    const signout = () => {
        logout();
        setGuest(null);
        setGuestLevel(0);
        storeGuest(null);
    }

    const navBar = navItems.filter(item => guestLevel >= item.level)
                .map((item, index) => <Link to={item.link} key={index}>{item.title}</Link>
        );
    const logIn = <Link to="login"><button>Login</button></Link>;
    const logOut = <Link to="/"><button onClick={()=>signout()}>Logout</button></Link>;
    const logInOut = guest ? logOut : logIn;

  return (
    <>
    <div className='strip'>
        <div>
            { navBar }
        </div>
        <div>
            { logInOut }
        </div>
    </div>
    <Outlet />
    </>
  )
}
