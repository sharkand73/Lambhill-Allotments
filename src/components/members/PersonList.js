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



export default function PersonList({ people, canDelete, onPersonClick }) {


    const navigate = useNavigate();

    const deleteListItem = (id) => {
        navigate(`${id}/delete`);
        //deletePerson(id)
        //.then(()=> navigate(0));
    }

    const listItem = (person, index) => (
        <li className='list-item' key={index}>
            <div className='list-item-link' onClick={() => onPersonClick(person.id)}>
                {person.firstName} {person.lastName}
            </div>
            {canDelete && <Del onDelete={deleteListItem} id={person.id} />}
        </li>
    );

    const list = people.map((p, i) => listItem(p, i));

  return (
    <div className='main-container'>   
        <ul>
            { list }
        </ul>
    </div>
  )
}
