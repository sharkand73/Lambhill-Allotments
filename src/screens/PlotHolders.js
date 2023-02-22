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
  const [plotHolders, setPlotHolders] = useState(null);

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    }
    const people = getPeople().filter(p => !p.onWaitingList);
    setPlotHolders(people);
  }, []);

  if (!plotHolders){
    return (<Loading />);
  }
   
  return (
    <div className="container">
      <PersonList people={plotHolders} />
      <Outlet context={{ people: plotHolders }} />
    </div>
  )
}
