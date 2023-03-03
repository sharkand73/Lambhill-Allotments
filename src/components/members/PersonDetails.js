// Libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Utilities
import { setPerson } from '../../utilities/peopleRepository';
//Components
import PersonForm from './PersonForm';


export default function PersonDetails({ formPerson, waitingList, allPeople, setAllPeople }) {

    const [finalPerson, setFinalPerson] = useState(null);
    
    useEffect(() => {
        setFinalPerson(formPerson, formPerson.id);
    }, [formPerson]);

    const navigate = useNavigate();

    const getHeading = () => {
        return `Person: ${formPerson.firstName}`;
    }

    const onSubmit = (personModel) => {
        setPerson(personModel, personModel.id)
        .then(() => {
        navigate(0);
        });
    }

    if (!finalPerson){
        return;
    }

  return (
    <div className='form-container'>
        <div className='form'>
            <header>{getHeading()}</header>
            <PersonForm 
            initialPerson={formPerson} waitingList={waitingList} blank={false} onSubmit={onSubmit} />         
        </div>
    </div>
  )
}
