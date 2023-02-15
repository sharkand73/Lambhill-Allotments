import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import '../../styles/nav.css';

export default function MembersHome({ guest, guestLevel, signOut }) {

    const navigate = useNavigate();

    useEffect(() => {
      if (!guestLevel){
        console.log('No user!');
        signOut();
        navigate('/');
      }
    }, []);

  return (
    <>
        <NavBar guest={guest} guestLevel={guestLevel} signOut={signOut} />
        <Outlet />
    </>
  )
}

