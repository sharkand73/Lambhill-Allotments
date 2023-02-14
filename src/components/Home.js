import React from 'react'
import { Outlet } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../utilities/authService';
import { storeGuest } from '../utilities/helper';
import NavBar from './NavBar';
import '../styles/nav.css';

export default function Home({ guest, setGuest, guestLevel, setGuestLevel }) {

    const [user, loading, error] = useAuthState(auth);

    const signout = () => {
        logout();
        setGuest(null);
        setGuestLevel(0);
        storeGuest(null);
    }

  return (
    <>
        <NavBar guest={guest} guestLevel={guestLevel} signout={signout} />
        <Outlet />
    </>
  )
}
