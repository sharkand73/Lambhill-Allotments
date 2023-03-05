// Libraries
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
// Utilities
import { getPeople } from '../../utilities/peopleRepository';
// Components
import Loading from '../Loading';
// Styles


export default function AddTenants() {

    const navigate = useNavigate();
    const context = useOutletContext();
    const plots = context.plots;
    const people = context.people;
    const { id } = useParams();
    const [tenants, setTenants] = useState(null);

    useEffect(() => setTenants(findTenants()), [id, people]);

    const findTenants = function(){
        // console.log(`Plot name ${id}`);
        // console.log(`Plots: ${plots}`);
        // console.log(`People: ${people}`);
        if (id && plots && people && people.length > 0){
            const plot = plots.find(p => p.id === id);
        if (!plot) return null;
        const tenantNickNames = plot.tenants;
        return tenantNickNames.map(n => findPersonByNickName(n));
        }
    }

    const findPersonByNickName = function(nickName){
        if (!people) return null;
        return people.find(p => p.nickName = nickName);
    }

    if (!tenants){
        return <Loading />
    }

    const tenantList = tenants.map((t,i) => <li key={i}>{t.nickName}</li>)

  return (
    <>
        <h1>
            Add / remove tenants from {id}
        </h1>
        <ul>
            { tenantList }
        </ul>
    </>
  )
}
