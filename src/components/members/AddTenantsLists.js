// Libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Utilities
// Components
import Loading from '../Loading';
import PersonList from './PersonList';
import TenantList from './TenantList';
// Styles

export default function AddTenantsLists({ plot, plotTenants, startingPeople }) {

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
    <>
        <div>
            Add / remove tenants from {plot.id}
        </div>
        <div className='container'>
            
            <PersonList people={availablePeople} onPersonClick={addTenant} />  
            <div>
                <h3>{ plot.id } Tenants</h3>
                <TenantList people={tenants} onPersonClick={removeTenant} />
            </div>
        </div>
    </>
  )
}
