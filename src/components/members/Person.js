import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import PersonDetails from './PersonDetails';
import Loading from '../Loading';

export default function Person({ waitingList }) {

    const [error, setError] = useState(false);
    const [formPerson, setFormPerson] = useState(null);

    const { id } = useParams();
    const context = useOutletContext();
    const people = context.people;

    useEffect(() => setFormPerson(getPerson()), []);

    const getPerson = function() {
            if (!people){
            console.log(`No people`);
            setError(true);
            return null;
        }
        const person = people.find(p => p.id == id);
        if (!person){
            console.log(`id: ${id}`);
            setError(true);
            return null;
        }
        return person;
    }

    if (error){
        return (
            <div>Error!</div>
        );
    }
    
    if (!formPerson){
        return <Loading />
    }

  return (
    <PersonDetails formPerson={formPerson} waitingList={waitingList} />
  )
}
