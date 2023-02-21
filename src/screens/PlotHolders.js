//Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
//Utilities
import { getPeople } from '../utilities/helper';
//Components
import Loading from '../components/Loading';
import PersonList from '../components/members/PersonList';
//Styles
import '../styles/people.css';


export default function PlotHolders({ guestLevel }) {

  const navigate = useNavigate();
  const [plotholders, setPlotHolders] = useState(null);

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    } 
    const people = getPeople().filter(p => !p.onWaitingList);
    setPlotHolders(people);
  },[]);

  return (
    <div className="container">
      <PersonList people={plotholders ? plotholders : []} />
      {plotholders && <Outlet context={{ people: plotholders }} />}
      {!plotholders && <Loading /> }
    </div>
  )
}
