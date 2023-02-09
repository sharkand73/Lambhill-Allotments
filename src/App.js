import './App.css';
import React, { useState } from 'react';
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


function App() {

  const [guest, setGuest] = useState(null);
  const [guestLevel, setGuestLevel] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home guest={guest} setGuest={setGuest} guestLevel={guestLevel} setGuestLevel={setGuestLevel} />} >
          <Route index element={<HomeContent />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login guest={guest} setGuest={setGuest} 
          guestLevel={guestLevel} setGuestLevel={setGuestLevel} />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="members" element={<Home guest={guest} guestLevel={guestLevel} />} >
          <Route index element={<MembersHome />} />
          <Route path="map" element={<MapPage />} />
          <Route path="plotholders" element={<PlotHolders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
