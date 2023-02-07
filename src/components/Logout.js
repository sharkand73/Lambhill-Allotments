import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { logout } from '../firebase';

export default function Logout() {

  logout();
  
}
