import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import HomeContent from './components/HomeContent';
import About from './components/About';
import Events from './components/Events';
import Contact from './components/Contact';
import Login from './components/Login';
import MembersHome from './components/members/MembersHome';
import MapPage from './components/members/MapPage';
import PlotHolders from './components/members/PlotHolders';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route index element={<HomeContent />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="members" element={<Home />} >
          <Route index element={<MembersHome />} />
          <Route path="map" element={<MapPage />} />
          <Route path="plotholders" element={<PlotHolders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
