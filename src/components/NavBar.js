import React from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../utilities/helper';

export default function NavBar({ guest, guestLevel, signout }) {
    const navBar = navItems.filter(item => guestLevel >= item.level)
                .map((item, index) => (
                <NavLink to={item.link} key={index} className={ ({isActive}) => isActive ? 'selected' : 'link' }>
                    {item.title}
                </NavLink>
                )
            );
    const logIn = <NavLink to="login" className={ ({isActive}) => isActive ? 'selected' : 'link' }>
                    <button>
                        Login
                    </button>
                </NavLink>;
    const logOut = <NavLink to="/">
                    <button onClick={()=>signout()}>
                        Logout
                    </button>
                </NavLink>;
    const logInOut = guest ? logOut : logIn;

  return (
    <nav className='strip'>
        <div>
            { navBar }
        </div>
        <div>
            { logInOut }
        </div>
    </nav>
  )
}
