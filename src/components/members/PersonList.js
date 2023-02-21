//Libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//Styles
import '../../styles/people.css';
import { stringStartsWith } from '../../utilities/helper';


export default function PersonList({ people }) {

    const [filteredPeople, setFilteredPeople] = useState(people);
    const [filterText, setFilterText] = useState("");

    useEffect(() => updateList(), [filterText]);
    
    const filterTextChange = (e) => {
        setFilterText(e.target.value);
        console.log(filterText);   
    }

    const updateList = () => {
        const fullName = (p) => `${p.firstName} ${p.lastName}`;
        const tempList = people.filter(p => stringStartsWith(fullName(p), filterText));
        setFilteredPeople(tempList); 
    }

    const listItem = (person, index) => (
        <li className='list-item' key={index}>
            <Link to={person.uid}>
                {person.firstName} {person.lastName}
            </Link>
        </li>
    );

    const addPersonLink = (        
            <Link className='add-link' to=''>
                Add
            </Link>        
    );

    const list = filteredPeople.map((p, i) => listItem(p, i));

  return (
    <div className='main-container'>
        
        <input className='filter-text' type='text' value={filterText} placeholder='Filter name' onChange={(e) => filterTextChange(e)} />
        <ul>
            { list }
        </ul>
        <div>
            { addPersonLink }
        </div>
    </div>
  )
}
