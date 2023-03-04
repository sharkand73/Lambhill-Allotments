// Libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Utilities
import { stringStartsWith } from '../../utilities/helper';
import { deletePerson } from '../../utilities/peopleRepository';
// Components
import Del from '../bits/Del';
// Styles
import '../../styles/people.css';
import '../../styles/list.css';



export default function PersonList({ people }) {

    const [filteredPeople, setFilteredPeople] = useState(people);
    const [filterText, setFilterText] = useState("");

    useEffect(() => updateList(), [filterText]);
    const navigate = useNavigate();

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

    const deleteListItem = (id) => {
        deletePerson(id)
        .then(()=> navigate(0));
    }

    // const DelItem = ({ id }) => (
    //     <div className='del' onClick={() => deleteListItem(id)}>
    //         X
    //     </div>
    // );

    const listItem = (person, index) => (
        <li className='list-item' key={index}>
            <Link className='list-item-link' to={person.id}>
                {person.firstName} {person.lastName}
            </Link>
            <Del onDelete={deleteListItem} id={person.id} />
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
        {(people.length > 0) && <div className='filter-container'>
            <input className='filter-text' type='text' value={filterText} placeholder='Filter name' onChange={(e) => filterTextChange(e)} />            
            { addPersonLink }
        </div>}     
        <ul>
            { list }
        </ul>
    </div>
  )
}
