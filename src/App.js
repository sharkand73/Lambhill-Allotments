import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import HomeContent from './components/HomeContent';
import About from './components/About';
import Events from './components/Events';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import MembersHome from './components/members/MembersHome';
import MapPage from './components/members/MapPage';
import PlotHolders from './components/members/PlotHolders';
import WaitingList from './components/members/WaitingList';
import MembersRedirect from './components/members/MembersRedirect';
import { getData, storeGuest } from './utilities/helper';
import { logout } from './utilities/authService';

function App() {

  const [guest, setGuest] = useState(getData().guest);
  const [guestLevel, setGuestLevel] = useState(getData().guestLevel);
  //useEffect(() => console.log(`Stored guest: ${getData().guest.userName}`), []);

  const signOut = () => {
    logout();
    setGuest(null);
    setGuestLevel(0);
    storeGuest(null);
}

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home guest={guest} guestLevel={guestLevel} signOut={signOut} />} >
          <Route index element={<HomeContent />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login guest={guest} setGuest={setGuest} 
          guestLevel={guestLevel} setGuestLevel={setGuestLevel} />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="members" element={<MembersHome guest={guest} guestLevel={guestLevel} signOut={signOut} />} >
          <Route index element={<MembersRedirect guestLevel={guestLevel} signOut={signOut} />} />
          <Route path="map" element={<MapPage />} />
          <Route path="plotholders" element={<PlotHolders guestLevel={guestLevel} />} />
          <Route path="waitinglist" element={<WaitingList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
