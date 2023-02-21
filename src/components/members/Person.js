import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import PersonDetails from './PersonDetails';
import Loading from '../Loading';

export default function Person({ waitingList }) {

    const [error, setError] = useState(false);
    //const [formPerson, setFormPerson] = useState(null);

    const { uid } = useParams();
    const context = useOutletContext();
    const people = context.people;

    //useEffect(() => getPerson());

    const getPerson = function() {
            if (!people){
            console.log(`uid: ${uid}`);
            setError(true);
            return null;
        }
        const person = people.find(p => p.uid == uid);
        if (!person){
            console.log(`uid: ${uid}`);
            setError(true);
            return null;
        }
        return person;
    }

    const formPerson = getPerson();

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
