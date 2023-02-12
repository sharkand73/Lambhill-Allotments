import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, findGuestByEmail, logInWithUserNameAndPassword, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storeGuest } from '../utilities/helper';
import '../styles/login.css';

function Login({ guest, setGuest, guestLevel, setGuestLevel }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading){
            return;  // add loading component
        }
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
    }, [loading, user]);

    const signin = (newGuest) => {
        setGuest(newGuest);
        setGuestLevel(newGuest.level);
        storeGuest(newGuest)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        logInWithUserNameAndPassword(userName, password);
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