//Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
//Utilities
import { getPeople } from '../utilities/peopleRepository';
//Components
import Loading from '../components/Loading';
import PersonList from '../components/members/PersonList';
//Styles
import '../styles/people.css';


export default function PlotHolders({ guestLevel }) {

  const navigate = useNavigate();
  const [allPeople, setAllPeople] = useState([]);  // Need?
  const [plotHolders, setPlotHolders] = useState([]);

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    }
    getPeople()
    .then(people => {
      processData(people);
      console.log(`All people: ${people.map(p=>p.firstName)}`);
      console.log(`Plotholders: ${plotHolders.map(p=>p.firstName)}`);
    });
  }, []);

  const processData = function(peopleData){
    if (peopleData){
      setAllPeople(peopleData);
      const filteredPeople = peopleData.filter(p => !p.onWaitingList);
      // TODO: order the people here
      setPlotHolders(filteredPeople);
    }
  }
  if (!plotHolders || !plotHolders.length){
    return (<Loading />);
  }
   
  return (
    <div className="container">
      <PersonList people={plotHolders} />
      <Outlet context={{ people: plotHolders }} />
    </div>
  )
}
