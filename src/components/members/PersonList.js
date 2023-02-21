//Libraries
import React from 'react';
import { Link } from 'react-router-dom';
//Styles
import '../../styles/people.css';


export default function PersonList({ people }) {
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

    const list = people.map((p, i) => listItem(p, i));

  return (
    <div className='container'>
        <ul>
            { list }
        </ul>
        <div>
            { addPersonLink }
        </div>
    </div>
  )
}
