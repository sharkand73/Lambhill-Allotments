//Libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
//Utilities
import { getPeople } from '../utilities/peopleRepository';
//Components
import Loading from '../components/Loading';
import PersonList from '../components/members/PersonList';


export default function WaitingList({ guestLevel }) {
  const navigate = useNavigate();
  const [waitingListMembers, setWaitingListMembers] = useState(null);
  const [allPeople, setAllPeople] = useState(null); // Need?

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    } 
    getPeople()
    .then(people => processData(people));
  },[]);

  const processData = function(peopleData){
    if (!peopleData){
      return;
    }
    setAllPeople(peopleData);
    const filteredPeople = peopleData.filter(p => p.onWaitingList);
    // TODO: order the people here
    setWaitingListMembers(filteredPeople);  
  }

  const onPersonClick = (id) => navigate(`${id}`);

  const addPersonLink = (        
    <Link className='add-link' to=''>
        Add
    </Link>        
);

  if (!waitingListMembers){
    return (<Loading />);
  }
  
  return (
    <div className="container">
      <div>
        <PersonList people={waitingListMembers} canDelete={true} hasFilter={true} onPersonClick={onPersonClick} />
        { addPersonLink }
      </div>
      <Outlet context={{ people: waitingListMembers }} />
    </div>
  )
}
