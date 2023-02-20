import React, { useEffect, useState } from 'react';
import PersonForm from './PersonForm';

export default function PersonDetails({ formPerson, waitingList }) {

    const [editing, setEditing] = useState(false);
    const [personModel, setPersonModel] = useState(null);
    
    useEffect(() => {
        setPersonModel(formPerson);
        //console.log('UseEffect hit!');
    },[]);

    const onChange = (e) => {
        let tempModel = {...personModel};
        tempModel[e.target.name] = e.target.value;
        setPersonModel(tempModel);
    }

    const getHeading = () => {
        return "Person";
    }

    const onSubmit = () => {
        console.log(personModel);
    }

    if (!personModel){
        return (
            <div>Jobby</div>
        );
    }
  return (
    //<div>{ personModel.firstName }</div>
    <div className='form-container'>
        <div className='form'>
            <header>{getHeading()}</header>
            <PersonForm 
            //personModel={personModel} 
            personModel={personModel} waitingList={waitingList} editing={editing} onChange={onChange}/>
            {!editing && <button className="edit" onClick={() => setEditing(true)}>Edit</button>}
            {editing && <button className="cancel" onClick={() => setEditing(false)}>Cancel</button>}
            {editing && <button className="submit" onClick={onSubmit}>Update</button>}
        </div>
    </div>
  )
}
