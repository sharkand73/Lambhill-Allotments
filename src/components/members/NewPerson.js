//Libraries
import React, { useState } from 'react';
//Utilities
import { getEmptyPerson } from '../../utilities/helper';
//Components
import PersonForm from './PersonForm';
//Styles
import '../../styles/form.css';


export default function NewPerson({ waitingList }) {

    const [finalPerson, setFinalPerson] = useState(getEmptyPerson(waitingList));
   
    const getHeading = () => {
        return waitingList ? 'New Waiting List Member' : 'New Plotholder'
    }

    const onSubmit = (personModel) => {
        setFinalPerson(personModel);
        console.log(personModel);
    }

    if (!finalPerson){
        console.log("Null!");
        return (
            <div></div>
        );
    }

  return (
    <div className='form-container'>
        <div className='form'>
            <header>{getHeading()}</header>
            <PersonForm initialPerson={finalPerson} waitingList={waitingList} blank={true} onSubmit={onSubmit} /> 
        </div>
    </div>
  )
}
