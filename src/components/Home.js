import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../utilities/authService';
import { storeGuest, navItems } from '../utilities/helper';
import '../styles/nav.css';

export default function Home({ guest, guestLevel, setGuest, setGuestLevel }) {

    const [user, loading, error] = useAuthState(auth);

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
