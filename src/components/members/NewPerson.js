//Libraries
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Utilities
import { getEmptyPerson } from '../../utilities/helper';
import { setPerson } from '../../utilities/peopleRepository';
//Components
import PersonForm from './PersonForm';
//Styles
import '../../styles/form.css';


export default function NewPerson({ waitingList }) {

    const [finalPerson, setFinalPerson] = useState(getEmptyPerson(waitingList));
    const navigate = useNavigate();

    const getHeading = () => {
        return waitingList ? 'New Waiting List Member' : 'New Plotholder'
    }

    const onSubmit = (personModel) => {
        //setFinalPerson(personModel);
        setPerson(personModel, null)
        .then(() => {
            navigate(0);
        });
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
            <PersonForm initialPerson={finalPerson} waitingList={waitingList} blank={true} onSubmit={onSubmit} /> 
        </div>
    </div>
  )
}
