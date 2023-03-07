//Libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
//Utilities
import { getPeople } from '../utilities/peopleRepository';
//Components
import Loading from '../components/Loading';
import PersonList from '../components/members/PersonList';
//Styles
import '../styles/people.css';


export default function PlotHolders({ guestLevel }) {

  const navigate = useNavigate();
  const [allPeople, setAllPeople] = useState(null);  // Need?
  const [plotHolders, setPlotHolders] = useState(null);

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    }
    getPeople()
    .then(people => {
      processData(people);
      //console.log(`All people: ${people.map(p=>p.firstName)}`);
      //console.log(`Plotholders: ${plotHolders.map(p=>p.firstName)}`);
    });
  },[]);

  const processData = function(peopleData){
    if (!peopleData){
      return;
    }
    setAllPeople(peopleData);
    const filteredPeople = peopleData.filter(p => !p.onWaitingList);
    // TODO: order the people here
    setPlotHolders(filteredPeople);
  }

  const onPersonClick = (id) => navigate(id);

  const addPersonLink = (        
    <Link className='add-link' to=''>
        Add
    </Link>        
);

  if (!plotHolders){
    return (<Loading />);
  }
   
  return (
    <div className="container">
      <div>
        <PersonList people={plotHolders} canDelete={true} hasFilter={true} onPersonClick={onPersonClick} />
        { addPersonLink }
      </div>
      <Outlet context={{ people: plotHolders, allPeople, setAllPeople }} />
    </div>
  )
}
