import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logInWithUserNameAndPassword, logout } from '../utilities/authService';
import { findGuestByEmail } from '../utilities/guestRepository';
import { storeGuest } from '../utilities/helper';
import Loading from './Loading';
import '../styles/login.css';

function Login({ setGuest, setGuestLevel }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const loginTimeout = 4000;
    let timer;

    useEffect(() => {
        // if (loading){
        //     return;
        // }
        if (user){
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

    // useEffect(() => timeLogin(), [formSubmitted]);

    useEffect(() => resetForm(), [loginFailed]);

    const signin = (newGuest) => {
        setGuest(newGuest);
        setGuestLevel(newGuest.level);
        storeGuest(newGuest)
    }

    const resetForm = () => {
        setUserName("");
        setPassword("");
        setFormSubmitted(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setLoginFailed(false);
        logInWithUserNameAndPassword(userName, password)
        .then((data => {
            if (!data){
                setLoginFailed(true);
                setFormSubmitted(false);
            }
        }
        ));
    }

    const timeLogin = () => {
        if (formSubmitted){
            timer = setTimeout(() => {
                resetForm();
                setLoginFailed();
            }, loginTimeout);
        }
        if (!formSubmitted){
            clearTimeout(timer);    
        }
    }

    if (formSubmitted && !loginFailed){
        console.log('Loading...');
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
            autoFocus = {true}
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            placeholder="User name" />
            <input 
            className='login__textBox'
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
            autoComplete='false'     />
            <button 
            type='submit'
            className='login__btn' >
                Login
            </button>
            {loginFailed && <div className='login-failed'>
                Login failed.  Please try again.
            </div>}
        </form>

    </div>
  )
}

export default Login;