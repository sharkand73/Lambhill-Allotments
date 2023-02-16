import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmptyPerson } from '../../utilities/helper';
import '../../styles/form.css';
import PersonDetail from './PersonDetail';

export default function NewPerson({ waitingList }) {

    const [personModel, setPersonModel] = useState(getEmptyPerson());
    const navigate = useNavigate();
   
    const getHeading = () => {
        return waitingList ? 'New Waiting List Member' : 'New Plotholder'
    }

    const handleChange = (e) => {
        let tempModel = {...personModel};
        tempModel[e.target.name] = e.target.value;
        setPersonModel(tempModel);
    }

    const onSubmit = () => {
        console.log(personModel);
    }

  return (
    <div className='form-container'>
        <div className='form'>
            <header>{getHeading()}</header>
            <PersonDetail personModel={personModel} handleChange={handleChange} waitingList={waitingList} editing={true} />
            <button className="submit" onClick={onSubmit}>
                Add
            </button>
        </div>
    </div>
  )
}
