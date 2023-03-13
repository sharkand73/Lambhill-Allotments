//Libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//Utilities
import { getPeople } from '../utilities/peopleRepository';
import { stringStartsWith } from '../utilities/helper';
//Components
import Loading from '../components/Loading';
import PersonList from '../components/members/PersonList';
//Styles
import '../styles/people.css';


export default function PlotHolders({ guestLevel }) {

  const navigate = useNavigate();
  const [allPeople, setAllPeople] = useState(null);  // Need?
  const [plotHolders, setPlotHolders] = useState(null);
  const [filteredPlotHolders, setFilteredPlotHolders] = useState(null);
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
    const nonWaitingListPeople = peopleData.filter(p => p.isPlotHolder);
    // TODO: order the people here
    setPlotHolders(nonWaitingListPeople);
    setFilteredPlotHolders(nonWaitingListPeople);
  }

  const updateList = () => {
    if (!plotHolders) return;
    const fullName = (p) => `${p.firstName} ${p.lastName}`;
    const nameFull = (p) => `${p.lastName} ${p.firstName}`;
    const tempList = plotHolders.filter(p => ( stringStartsWith(fullName(p), filterText)
                                     || stringStartsWith(nameFull(p), filterText)));
    setFilteredPlotHolders(tempList); 
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
      <div className="left-column">
        <h2>Plotholders</h2>
        
        <div className='filter-container'>
          { addPersonLink }  
          { plotHolders.length > 0 &&
          <>
            <FontAwesomeIcon className='search' icon={faSearch} />
            <input className='filter-text' type='text' value={filterText} placeholder='Filter name' onChange={(e) => setFilterText(e.target.value)} />
          </> }
        </div>
        <PersonList people={filteredPlotHolders} canDelete={true} onPersonClick={onPersonClick} />
      </div>
      <Outlet context={{ people: plotHolders, allPeople, setAllPeople }} />  
       {/* TODO: remove allPeople, setAllPeople ? */}
    </div>
  )
}
