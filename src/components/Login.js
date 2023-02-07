import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading){
            return;  // add loading component
        }
        if (user){
            navigate('/');
        }
    }, [loading, user]);

  return (
    <div className='login'>
        <div className='login__container'>
            <input 
            className='login__textBox'
            type='text'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email address" />
            <input 
            className='login__textBox'
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password" />
            <button 
            className='login__btn' 
            onClick={()=>logInWithEmailAndPassword(email, password)} >
                Login
            </button>
        </div>
    </div>
  )
}

export default Login;