//Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
//Utilities
import { getPlots } from '../utilities/peopleRepository';
//Components
import Loading from '../components/Loading';
//import PersonList from '../components/members/PersonList';
//Styles
import '../styles/people.css';


export default function Plots({ guestLevel }) {

  const navigate = useNavigate();
  // const [allPlots, setAllPlots] = useState(null);  

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    }
    // getPeople()
    // .then(people => {
    //   processData(people);
    // });
  },[]);
  
  // if (!plots){
  //   return (<Loading />);
  // }
   
  return (
    <div className="container">
      <Outlet />
    </div>
  )
}
