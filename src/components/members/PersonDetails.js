import React, { useEffect, useState } from 'react';
import PersonForm from './PersonForm';

export default function PersonDetails({ formPerson, waitingList }) {

    const [finalPerson, setFinalPerson] = useState(null);
    
    useEffect(() => {
        setFinalPerson(formPerson);
        //console.log(`UseEffect hit!\nformPerson: ${formPerson.firstName}`);
    }, [formPerson]);

    const getHeading = () => {
        return `Person: ${formPerson.firstName}`;
    }

    const onSubmit = (personModel) => {
        console.log(personModel);
    }

    const onDelete = (personModel) => {
        console.log(`Delete person with uid: ${personModel.uid}`);
    }

    if (!finalPerson){
        return (
            <div></div>
        );
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
