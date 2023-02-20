import React from 'react';
import { Link } from 'react-router-dom';

export default function PersonList({ people }) {
    const listItem = (person, index) => (
        <li key={index}>
            <Link to={person.uid}>
                {person.firstName} {person.lastName}
            </Link>
        </li>
    );

    const list = people.map((p, i) => listItem(p, i));

  return (
    <ul>
        { list }
    </ul>
  )
}
