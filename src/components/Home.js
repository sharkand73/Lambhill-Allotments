import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { logout } from '../firebase';
import '../styles/nav.css';

export default function Home() {
    // Change to User in state
    let user = {userName: 'committee', level: 2};

    let userLevel = user ? user.level : 0; 
    const navItems = [
        {title: 'Home', link: '/', level: 0},
        {title: 'About', link: 'about', level: 0},
        {title: 'Events', link: 'events', level: 0},
        {title: 'Contact', link: 'contact', level: 0},
        {title: 'Map', link: 'map', level: 1},
        {title: 'Plotholders', link: 'plotholders', level: 2}
    ];
    const navBar = navItems.filter(item => userLevel >= item.level)
                .map((item, index) => <Link to={item.link} key={index}>{item.title}</Link>
        );
    const logIn = <Link to="login">Login</Link>;
    const logOut = <div onClick={logout}>Logout</div>;
    const logInOut = user ? logOut : logIn;

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
