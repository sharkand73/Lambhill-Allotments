//Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
//Utilities
import { getPlots } from '../utilities/plotRepository';
//Components
import Loading from '../components/Loading';
//import PersonList from '../components/members/PersonList';
//Styles
import '../styles/people.css';
import { getPeople } from '../utilities/peopleRepository';


export default function Plots({ guestLevel }) {

  const navigate = useNavigate();
  const [allPlots, setAllPlots] = useState(null);  
  const [people, setPeople] = useState(null);  

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    }
    getAllPlots();
    getAllPeople();
    },[]);

    const getAllPlots = () => {
      getPlots()
      .then(data => setAllPlots(data));
    }

    const getAllPeople = () => {
      getPeople()
      .then(data => setPeople(data));
    }
  
  if (!allPlots){
    return (<Loading />);
  }
   
  return (
    <div className="scrollable container">
      <Outlet context={{ plots: allPlots, people }}/>
    </div>
  )
}
