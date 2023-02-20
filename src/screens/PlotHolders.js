import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import PersonList from '../components/members/PersonList';
import { getPeople } from '../utilities/helper';
import '../styles/people.css';
import Loading from '../components/Loading';

export default function PlotHolders({ guestLevel }) {

  const navigate = useNavigate();
  const [plotholders, setPlotHolders] = useState(null);

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    } 
    const people = getPeople();
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
