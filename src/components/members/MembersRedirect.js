import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MembersRedirect({ guestLevel, signOut }) {

    const navigate = useNavigate();
    //const redirect = () => navigate('map');

    useEffect(() => redirect(), []);



    const redirect = function() {
        switch (guestLevel){
            case 1: 
                navigate('map');
                break;           
            case 2: 
                navigate('plotholders');
                console.log('Case 2 hit');
                break;
            default: 
                console.log(`Default!\nGuest level: ${guestLevel}`);
                //signOut();
                navigate('/');
        }
    }
    
  return (
    <div></div>
  )
}
