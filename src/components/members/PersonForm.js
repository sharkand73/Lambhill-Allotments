import React, { useState, useEffect } from 'react';

export default function PersonForm({ initialPerson, waitingList, blank, onSubmit }) {

    const [editing, setEditing] = useState(blank);
    const [personModel, setPersonModel] = useState(initialPerson);

    useEffect(() => setPersonModel(initialPerson), [initialPerson]);

    const onChange = (e) => {
        let tempModel = {...personModel};
        tempModel[e.target.name] = e.target.value;
        setPersonModel(tempModel);
    }

    return (
    <>
        <div className='form-group'>
            <label>First name</label>
            <input type='text' disabled={!editing} className="form-input" name='firstName' value={personModel.firstName} onChange={onChange} />
        </div>
        <div className='form-group'>
            <label>Last name</label>
            <input type='text' disabled={!editing} className="form-input" name='lastName' value={personModel.lastName} onChange={onChange} />
        </div>
        <div className='form-group'>
            <label>Nickname</label>
            <input type='text' disabled={!editing} className="form-input" name='nickName' value={personModel.nickName} onChange={onChange} />
        </div>
        {!waitingList && <div className='form-group'>
            <label>Date joined</label>
            <input type='date' disabled={!editing} className="form-input" name='dateJoined' value={personModel.dateJoined} onChange={onChange} />
        </div>}
        {waitingList && <div className='form-group'>
            <label>Date joined</label>
            <input type='date' disabled={!editing} className="form-input" name='joinedWaitingList' value={personModel.joinedWaitingList} onChange={onChange} />
        </div>}
        <div className='form-group'>
            <label>Address</label>
            <textarea type='text' disabled={!editing} className="form-input" name='address' value={personModel.address} onChange={onChange} ></textarea>
        </div>
        <div className='form-group'>
            <label>Telephone</label>
            <input type='text' disabled={!editing} className="form-input" name='phoneNumber' value={personModel.phoneNumber} onChange={onChange} />
        </div>
        <div className='form-group'>
            <label>Email</label>
            <input type='text' disabled={!editing} className="form-input" name='email' value={personModel.email} onChange={onChange} />
        </div>
        <div className='form-group'>
            <label>Alt email</label>
            <input type='text' disabled={!editing} className="form-input" name='altEmail' value={personModel.altEmail} onChange={onChange} />
        </div>
        {!editing && !waitingList && <div className='form-group'>
            <label>Plots</label>
            <input type='text' disabled={true} className="form-input" name='plots' value={personModel.plots} />
        </div>}

        {!blank && !editing &&  <button className="edit" onClick={() => setEditing(true)}>Edit</button>}
        {!blank && editing && <button className="cancel" onClick={() => setEditing(false)}>Cancel</button>}
        {editing && <button className="submit" onClick={() => onSubmit(personModel)}>Submit</button>}            
    </>
  )
}
