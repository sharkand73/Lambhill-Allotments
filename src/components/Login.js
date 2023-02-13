import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logInWithUserNameAndPassword, logout } from '../utilities/authService';
import { findGuestByEmail } from '../utilities/guestRepository';
import { storeGuest } from '../utilities/helper';
import Loading from './Loading';
import '../styles/login.css';

function Login({ setGuest, guestLevel, setGuestLevel }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        // if (loading){
        //     return;
        // }
        if (user){
            //console.log(user);
            console.log(user.email);    
            findGuestByEmail(user.email)
            .then((newGuest) => {
            if (newGuest){
                signin(newGuest);
                navigate('/');
            }
            else {
                logout();
                alert("Something went wrong!");
            }
        });
        }
    }, [user]);

    const signin = (newGuest) => {
        setGuest(newGuest);
        setGuestLevel(newGuest.level);
        storeGuest(newGuest)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        logInWithUserNameAndPassword(userName, password);
    }

    if (loading){
        return (
            <div className='loading'>
                <Loading />
            </div>
        );
    }
  return (
    <div className='login'>
        <form className='login__container' onSubmit={onSubmit}>
            <input 
            className='login__textBox'
            type='text'
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            placeholder="User name" />
            <input 
            className='login__textBox'
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password" />
            <button 
            type='submit'
            className='login__btn' >
                Login
            </button>
        </form>
    </div>
  )
}

export default Login;