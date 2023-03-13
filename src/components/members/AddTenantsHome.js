// Libraries
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { orderAlphabetically } from '../../utilities/helper';
// Utilities
import { getPeople } from '../../utilities/peopleRepository';
// Components
import Loading from '../Loading';
import AddTenants from './AddTenants';
// Styles

export default function AddTenantsHome() {

    const navigate = useNavigate();
    const context = useOutletContext();
    const plots = context.plots;
    const people = context.people;
    const { id } = useParams();

    let tenants = null;
    let startingPeople = orderAlphabetically(people, 'lastName');
    let plot = null;

    const findPersonByNickName = function(nickName){
        if (!people) return null;
        return people.find(p => p.nickName === nickName);
    }

    const removeTenantFromStartingPeople = (t) => {
        const i = startingPeople.findIndex(p => p.id === t.id);
        startingPeople.splice(i,1);
    }

    if (plots){
        plot = plots.find(p => p.id === id);   
        const tenantNickNames = plot.tenants;
        tenants = tenantNickNames.map(n => findPersonByNickName(n));
        tenants.forEach(t => removeTenantFromStartingPeople(t));
        orderAlphabetically(tenants, 'lastName');
    }

    if (!tenants || !plot){
        return <Loading />
    }

  return (
    <div className='add-tenants-home-container'>
        <h2>
            Add / remove tenants from {plot.id}
        </h2>
        <div className='add-tenants-container'>
            <AddTenants plotTenants={tenants} people={people} startingPeople={startingPeople} plot={plot} />
        </div>
    </div>
  )
}
