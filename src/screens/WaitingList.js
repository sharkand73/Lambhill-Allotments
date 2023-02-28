//Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
//Utilities
import { getPeople } from '../utilities/peopleRepository';
//Components
import Loading from '../components/Loading';
import PersonList from '../components/members/PersonList';


export default function WaitingList({ guestLevel }) {
  const navigate = useNavigate();
  const [waitingListMembers, setWaitingListMembers] = useState([]);
  const [allPeople, setAllPeople] = useState([]);

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    } 
    getPeople()
    .then(people => processData(people));
  },[]);

  const processData = function(peopleData){
    if (peopleData){
      setAllPeople(peopleData);
      const filteredPeople = peopleData.filter(p => p.onWaitingList);
      // TODO: order the people here
      setWaitingListMembers(filteredPeople);
    }
  }

  if (!waitingListMembers || !waitingListMembers.length){
    return (<Loading />);
  }
  
  return (
    <div className="container">
      <PersonList people={waitingListMembers} />
      <Outlet context={{ people: waitingListMembers, allPeople }} />
    </div>
  )
}
