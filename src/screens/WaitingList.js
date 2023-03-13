//Libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//Utilities
import { getPeople } from '../utilities/peopleRepository';
import { orderAlphabetically, stringStartsWith } from '../utilities/helper';
//Components
import Loading from '../components/Loading';
import PersonList from '../components/members/PersonList';
//Styles
import '../styles/people.css';

export default function WaitingList({ guestLevel }) {
  const navigate = useNavigate();
  const [allPeople, setAllPeople] = useState(null); // Need?
  const [waitingList, setWaitingList] = useState(null);
  const [filteredWaitingList, setFilteredWaitingList] = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (guestLevel === 1){
        navigate('map');
    } 
    getPeople()
    .then(people => processData(people));
  },[]);

  useEffect(() => updateList(), [filterText]);

  const processData = function(peopleData){
    if (!peopleData){
      return;
    }
    setAllPeople(peopleData);
    let waitingListPeople = peopleData.filter(p => p.onWaitingList);
    orderAlphabetically(waitingListPeople, 'joinedWaitingList');
    setWaitingList(waitingListPeople); 
    setFilteredWaitingList(waitingListPeople); 
  }

  const updateList = () => {
    if (!waitingList) return;
    const fullName = (p) => `${p.firstName} ${p.lastName}`;
    const nameFull = (p) => `${p.lastName} ${p.firstName}`;
    const tempList = waitingList.filter(p => ( stringStartsWith(fullName(p), filterText)
                                     || stringStartsWith(nameFull(p), filterText)));
    setFilteredWaitingList(tempList); 
}

  const onPersonClick = (id) => navigate(`${id}`);

  const addPersonLink = (        
    <Link className='add-link' to=''>
        Add
    </Link>        
);

  if (!waitingList){
    return (<Loading />);
  }
  
  return (
    <div className="container">
      <div className="left-column">
        <h2>Waiting List</h2>
        <div className='filter-container'>
          { addPersonLink }  
          { waitingList.length > 0 &&
          <>
            <FontAwesomeIcon className='search' icon={faSearch} />
            <input className='filter-text' type='text' value={filterText} placeholder='Filter name' onChange={(e) => setFilterText(e.target.value)} />
          </> }
        </div>
        <PersonList people={filteredWaitingList} canDelete={true} onPersonClick={onPersonClick} />
      </div>
      <Outlet context={{ people: waitingList, allPeople, setAllPeople }} />
    </div>
  )
}
