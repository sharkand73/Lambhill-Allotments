// Libraries
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
// Utilities
import { deletePerson, switchToPlotHolders, switchToWaitingList } from '../../utilities/peopleRepository';
// Components
import Loading from '../Loading';
import Tick from '../bits/Tick';
// Styles
import '../../styles/people.css';

export default function DeletePerson({ waitingList }) {
    const params = useParams();
    const context = useOutletContext();
    const navigate = useNavigate();

    const id = params.id;
    const people = context.people;
    const [selected, setSelected] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [person, setPerson] = useState(null);
    const goTo = waitingList ? '/members/waitingList' : '/members/plotHolders';

    useEffect(() => {
        if (redirect) {
            navigate(goTo);
        }
    }, [redirect]);

    useEffect(()=> getPerson(), []);

    const getPerson = function() {
        if (!people){
        console.log(`No people`);
        setRedirect(true);
        }
        const foundPerson = people.find(p => p.id == id);
        if (!foundPerson){
            setRedirect(true);
        }
        setPerson(foundPerson);
    }
    
    const moveToPlotHolders = () => {
        switchToPlotHolders(person)
        .then(() => navigate(0)); 
    }
    const moveToWaitingList = () => {
        switchToWaitingList(person)
        .then(() => navigate(0)); 
    }
    const deleteCurrent = () => {
        deletePerson(id)
        .then(() => navigate(0)); 
    }

    const proceed = () => {
        let callBack;
        if (selected){
            callBack = () => deleteCurrent();
        }
        else {
            callBack = waitingList ? () => moveToPlotHolders()
                                   : () => moveToWaitingList();
        }
        callBack();      
    }

    if (!person){
        return <Loading />
    }
    
  return (
    <div className='delete-container'>
        <div className='delete-heading'>
            Remove {person.nickName} From {waitingList ? 'Waiting List' : 'Plot Holders'}
        </div>
        <div className='delete-options-container'>
            <h4>
                Select an option:
            </h4>
            {
            !waitingList && 
            <div className='delete-option'>
                <div onClick={()=>setSelected(0)}>
                Move to waiting list
                </div>
                <Tick bool={selected === 0} />   
            </div>         
            }
            {
            waitingList && 
            <div className='delete-option'>
                <div onClick={()=>setSelected(0)}>
                Remove from waiting list
                </div>
                <Tick bool={selected === 0} /> 
            </div>         
            }
            <div className='delete-option'>
                <div onClick={()=>setSelected(1)}>
                    Delete person record
                </div>
                <Tick bool={selected === 1} /> 
            </div>
            <div className='two-button-container'>
                <button className='delete-button' onClick={()=>navigate(-1)}>Cancel</button>
                <button className='delete-button' onClick={()=>proceed()}>Proceed</button>
            </div>
        </div>
    </div>
    // <div>DeletePerson {person.nickName} {waitingList ? 'on waiting list' : null}</div>
  )
}
