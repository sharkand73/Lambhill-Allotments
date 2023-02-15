import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../utilities/authService';
import { storeGuest } from '../utilities/helper';
import NavBar from './NavBar';
import '../styles/nav.css';

export default function Home({ guest, guestLevel, signOut }) {

  return (
    <>
        <NavBar guest={guest} guestLevel={guestLevel} signOut={signOut} />
        <Outlet />
    </>
  )
}
