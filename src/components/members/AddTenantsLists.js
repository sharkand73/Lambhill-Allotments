// Libraries
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
// Utilities
import { getPeople } from '../../utilities/peopleRepository';
// Components
import Loading from '../Loading';
import PersonList from './PersonList';
// Styles

export default function AddTenants({ plot, plotTenants, startingPeople }) {

    const navigate = useNavigate();   
    const [tenants, setTenants] = useState(plotTenants);
    const [availablePeople, setAvailablePeople] = useState(startingPeople);

    useEffect(() => console.log(availablePeople.length, tenants.length), [tenants]);

    const addTenant = (id) => {
        const i = availablePeople.findIndex(p => p.id === id);
        let tempTenants = [...tenants];
        tempTenants.push(availablePeople[i]);
        let tempAvailablePeople = [...availablePeople];
        tempAvailablePeople.splice(i, 1);
        setTenants(tempTenants);
        setAvailablePeople(tempAvailablePeople);
    }

    const removeTenant = (id) => {
        const i = tenants.findIndex(p => p.id === id);
        let tempAvailablePeople = [...availablePeople];
        let tempTenants = [...tenants];
        tempAvailablePeople.push(tenants[i]);
        tempTenants.splice(i, 1);
        setAvailablePeople(tempAvailablePeople);
        setTenants(tempTenants);
    }

  return (
    <div className='container'>
        <h2>
            Add / remove tenants from {plot.id}
        </h2>
        {/* <PersonList people={availablePeople} hasFilter={true} onPersonClick={addTenant} /> */}
        <ul>
            {availablePeople.map(p => <li onClick={()=>addTenant(p.id)}>{p.nickName}</li>)}
        </ul>
        <div>
            <h3>{ plot.id } Tenants</h3>
            {/* <PersonList people={tenants} onPersonClick={removeTenant} /> */}
            <ul>
                {tenants.map(p => <li onClick={()=>removeTenant(p.id)}>{p.nickName}</li>)}
            </ul>
        </div>
    </div>
  )
}
