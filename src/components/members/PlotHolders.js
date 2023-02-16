import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonList from './PersonList';
import NewPerson from './NewPerson';
import { people } from '../../utilities/helper';
import '../../styles/people.css';

export default function PlotHolders({ guestLevel }) {

  const plotHolders = people;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    } 
  },[]);

  return (
    <div className="plotHolders-container">
      <NewPerson waitingList={false} />
      <PersonList people={people} />
    </div>
  )
}
