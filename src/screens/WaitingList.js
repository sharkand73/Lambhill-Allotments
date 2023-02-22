//Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
//Utilities
import { getPeople } from '../utilities/helper';
//Components
import Loading from '../components/Loading';
import PersonList from '../components/members/PersonList';


export default function WaitingList({ guestLevel }) {
  const navigate = useNavigate();
  const [waitingListMembers, setWaitingListMembers] = useState(null);

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    } 
    const people = getPeople().filter(p => p.onWaitingList);
    setWaitingListMembers(people);
  },[]);

  if (!waitingListMembers){
    return (<Loading />);
  }
  
  return (
    <div className="container">
      <PersonList people={waitingListMembers} />
      <Outlet context={{ people: waitingListMembers }} />
    </div>
  )
}
