import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function Person() {
    const { uid } = useParams();
    const location = useLocation();
    const people = location.state?.people;
    if (!people){
        console.log(`uid: ${uid}`);
        console.log(`location.state: ${location.state}`);
        return (
            <div>Error!</div>
        );
    }
    const person = people.find(p => p.uid === uid);
    if (!person){
        console.log(`uid: ${uid}`);
        console.log(`location.state: ${location.state}`);
        return (
            <div>Error!</div>
        );
    }
    const [editing, setEditing] = useState(false);
    const getHeading = () => {
        return "Person";
    }

  return (
    <div className='form-container'>
        <div className='form'>
            <header>{getHeading()}</header>
            <PersonDetail personModel={person} handleChange={handleChange} waitingList={person.onWaitingList} editing={editing} />
            <button className="submit" onClick={onSubmit}>
                Add
            </button>
        </div>
    </div>
  )
}
