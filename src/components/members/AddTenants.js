// Libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// Utilities
import { stringStartsWith } from '../../utilities/helper';
import { setPlot } from '../../utilities/plotRepository';
// Components
import Loading from '../Loading';
import PersonList from './PersonList';
import TenantList from './TenantList';
// Styles
import '../../styles/people.css';
import '../../styles/list.css';
import '../../styles/plot.css';


export default function AddTenants({ plot, plotTenants, startingPeople }) {

    const navigate = useNavigate();   
    const [tenants, setTenants] = useState(plotTenants);
    const [availablePeople, setAvailablePeople] = useState(startingPeople);
    const [filteredAvailablePeople, setFilteredAvailablePeople] = useState(startingPeople);
    const [filterText, setFilterText] = useState("");

    useEffect(() => updateList(), [filterText, availablePeople]);

    const addTenant = (id) => {
        if (tenants.length == 4) {
            alert('Only four tenants allowed per plot')
            return
        };
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

    const updateList = () => {
        if (!availablePeople) return;
        const fullName = (p) => `${p.firstName} ${p.lastName}`;
        const nameFull = (p) => `${p.lastName} ${p.firstName}`;
        const tempList = availablePeople.filter(p => ( stringStartsWith(fullName(p), filterText)
                                     || stringStartsWith(nameFull(p), filterText)));
        setFilteredAvailablePeople(tempList); 
    }

    const onSave = () => {
        plot.tenants = tenants.map(t => t.nickName);
        plot.occupied = tenants.length > 0;
        setPlot(plot)
        .then(navigate(`/members/plots/${plot.id}`));
    }

  return (
    <>
        <div className='container'>
            <div>
                <div className='filter-container'>
                { availablePeople.length > 0 &&
                    <>
                        <FontAwesomeIcon className='search' icon={faSearch} />
                        <input className='filter-text' type='text' value={filterText} placeholder='Filter name' onChange={(e) => setFilterText(e.target.value)} />
                    </> }
                </div>
                <PersonList people={filteredAvailablePeople} onPersonClick={addTenant} />  
            </div>
            <div>
                <div className='plot'>
                    <h3>{ plot.id } Tenants</h3>
                    <TenantList people={tenants} onPersonClick={removeTenant} />    
                </div>
                <div className='button-container'>
                    <button className="save" onClick={() => onSave()}>Save</button>
                </div>
            </div>
        </div>
    </>
  )
}
