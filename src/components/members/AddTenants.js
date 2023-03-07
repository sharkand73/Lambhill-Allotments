// Libraries
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
// Utilities
import { getPeople } from '../../utilities/peopleRepository';
// Components
import Loading from '../Loading';
import AddTenantsLists from './AddTenantsLists';
// Styles

export default function AddTenants() {

    const navigate = useNavigate();
    const context = useOutletContext();
    const plots = context.plots;
    const people = context.people;
    const { id } = useParams();

    let tenants = null;
    let plot = null;

    const findPersonByNickName = function(nickName){
        if (!people) return null;
        return people.find(p => p.nickName === nickName);
    }

    if (plots){
        plot = plots.find(p => p.id === id);   
        const tenantNickNames = plot.tenants;
        tenants = tenantNickNames.map(n => findPersonByNickName(n));
    }

    if (!tenants || !plot){
        return <Loading />
    }

  return (
    <AddTenantsLists plotTenants={tenants} startingPeople={people} plot={plot} />
  )
}
