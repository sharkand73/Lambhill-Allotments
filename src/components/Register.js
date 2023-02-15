import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { registerWithEmailAndPassword } from '../utilities/authService';
import '../styles/register.css';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [level, setLevel] = useState(0);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        console.log("Register fn hit!")
        if (!userName){
            alert("Please enter a user name");
            return;
        }
        if (!level){
            alert("Please select a user level");
            return;
        }
        const guestModel = { userName, level, email, password };
        registerWithEmailAndPassword(guestModel);
    }

    useEffect(() => {
        if (loading){
            return;
        }
        if (user){
            navigate("/", {replace: true});
        }
    }, [loading, user]);

    useEffect(() => {
        console.log(level);
    }, [level]);

    return (
        <div className="register">
            <div className="register__container">
                <input
                type="text"
                className="register__textBox"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User Name"
                />
                <select 
                className="register__textBox" 
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}>
                    <option disabled value={0}>User Level</option>
                    <option value={1}>Plotholder</option>
                    <option value={2}>Committee</option>
                </select>
                <input
                type="text"
                className="register__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
                />
                <input
                type="password"
                className="register__textBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />
                <button className="register__btn" onClick={register}>
                Register
                </button>
            </div>
        </div>
    )
}
