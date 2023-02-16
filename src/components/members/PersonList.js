import React from 'react';

export default function PersonList({ people }) {
    const listItem = (person, index) => (
        <li key={index}>
            {person.firstName} {person.lastName}
        </li>
    );

    const list = people.map((p, i) => listItem(p, i));

  return (
    <ul>
        { list }
    </ul>
  )
}
