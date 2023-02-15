import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emptyPerson } from '../../utilities/helper';
import '../../styles/form.css';

export default function NewPerson({ waitingList, guestLevel }) {

    const [personModel, setPersonModel] = useState(emptyPerson);
    const navigate = useNavigate();
    useEffect(() => {
        if (guestLevel === 1){
            navigate('map');
        } 
    },[]);
    const handleChange = (e) => {
        let tempModel = {...personModel};
        tempModel[e.target.name] = e.target.value;
        setPersonModel(tempModel);
    }

    const onSubmit = () => {
        console.log(personModel);
    }

  return (
    <div className='form'>
        <div className='form-group'>
            <label>First name</label>
            <input type='text' className="form-input" name='firstName' value={personModel.firstName} onChange={handleChange} />
        </div>
        <div className='form-group'>
            <label>Last name</label>
            <input type='text' className="form-input" name='lastName' value={personModel.lastName} onChange={handleChange} />
        </div>
        {!waitingList && <div className='form-group'>
            <label>Date joined</label>
            <input type='date' className="form-input" name='dateJoined' value={personModel.dateJoined} onChange={handleChange} />
        </div>}
        {waitingList && <div className='form-group'>
            <label>Date joined</label>
            <input type='date' className="form-input" name='joinedWaitingList' value={personModel.joinedWaitingList} onChange={handleChange} />
        </div>}
        <div className='form-group'>
            <label>Address</label>
            <input type='text' className="form-input" name='address' value={personModel.address} onChange={handleChange} />
        </div>
        <div className='form-group'>
            <label>Tel</label>
            <input type='text' className="form-input" name='phoneNumber' value={personModel.phoneNumber} onChange={handleChange} />
        </div>
        <div className='form-group'>
            <label>Email</label>
            <input type='text' className="form-input" name='email' value={personModel.email} onChange={handleChange} />
        </div>
        <div className='form-group'>
            <label>Alt email</label>
            <input type='text' className="form-input" name='altEmail' value={personModel.altEmail} onChange={handleChange} />
        </div>
        <button className="submit" onClick={onSubmit}>
            Add
        </button>
    </div>
  )
}
