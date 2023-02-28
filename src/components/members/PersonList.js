//Libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//Styles
import '../../styles/people.css';
import { stringStartsWith } from '../../utilities/helper';
import { deletePerson } from '../../utilities/peopleRepository';


export default function PersonList({ people }) {

    const [filteredPeople, setFilteredPeople] = useState(people);
    const [filterText, setFilterText] = useState("");

    useEffect(() => updateList(), [filterText]);
    
    const filterTextChange = (e) => {
        setFilterText(e.target.value);
    }

    const updateList = () => {
        const fullName = (p) => `${p.firstName} ${p.lastName}`;
        const nameFull = (p) => `${p.lastName} ${p.firstName}`;
        const tempList = people.filter(p => ( stringStartsWith(fullName(p), filterText)
                                         || stringStartsWith(nameFull(p), filterText)));
        setFilteredPeople(tempList); 
    }

    const deletePerson = (nickname) => console.log(nickname);

    const DelItem = ({nickname}) => (
        <div className='del' onClick={() => deletePerson(nickname)}>
            X
        </div>
    );

    const listItem = (person, index) => (
        <li className='list-item' key={index}>
            <Link className='list-item-link' to={person.nickName}>
                {person.firstName} {person.lastName}
            </Link>
            <DelItem nickName={person.nickName} />
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
        <div className='filter-container'>
            <input className='filter-text' type='text' value={filterText} placeholder='Filter name' onChange={(e) => filterTextChange(e)} />            
            { addPersonLink }
        </div>     
        <ul>
            { list }
        </ul>
    </div>
  )
}
