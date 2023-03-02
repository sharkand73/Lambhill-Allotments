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
import MapPage from './screens/MapPage';
import PlotHolders from './screens/PlotHolders';
import WaitingList from './screens/WaitingList';
import MembersRedirect from './components/members/MembersRedirect';
import Person from './components/members/Person';
import { getData, storeGuest } from './utilities/helper';
import { logout } from './utilities/authService';
import NewPerson from './components/members/NewPerson';

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
          <Route path="plotholders" element={<PlotHolders guestLevel={guestLevel} />} >
            <Route index element={< NewPerson waitingList={false} />} />
            <Route path=":id" element={<Person waitingList={false} />} />
          </Route>
          <Route path="waitinglist" element={<WaitingList guestLevel={guestLevel} />} >
            <Route index element={< NewPerson waitingList={true} />} />
            <Route path=":id" element={<Person waitingList={true} />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
