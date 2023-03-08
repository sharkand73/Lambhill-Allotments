// Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Utilities
import { stringStartsWith } from '../../utilities/helper';
import { deletePerson } from '../../utilities/peopleRepository';
// Styles
import '../../styles/people.css';
import '../../styles/list.css';


export default function TenantList({ people, onPersonClick }) {

    const listItem = (person, index) => (
        <li className='list-item' key={index}>
            <div className='list-item-link' onClick={() => onPersonClick(person.id)}>
                {person.firstName} {person.lastName}
            </div>
        </li>
    );

    const list = people ? people.map((p, i) => listItem(p, i)) : [];

  return (
    <div className='main-container'>   
        <ul>
            { list }
        </ul>
    </div>
  )
}
