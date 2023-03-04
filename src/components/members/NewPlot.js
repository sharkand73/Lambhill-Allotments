//Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Utilities
import { getEmptyPlot } from '../../utilities/helper';
import { getPlots, setPlot } from '../../utilities/plotRepository';
import { getPeople } from '../../utilities/peopleRepository';

//Components
import Loading from '../Loading';
//Styles
import '../../styles/form.css';


export default function NewPlot() {

    const [plotList, setPlotList] = useState(null);
    const [people, setPeople] = useState(null);
    const [plotModel, setPlotModel] = useState(getEmptyPlot());
    const navigate = useNavigate();

    useEffect(() => {
        getPlots()
        .then(data => setPlotList(data));
        getPeople()
        .then(data => setPeople(data));
    }, []);

    const getHeading = () => {
        return 'New Plot';
    }

    const onChange = (e) => {
        let tempPlot = {...plotModel};
        tempPlot[e.target.name] = e.target.value;
        setPlotModel(tempPlot);
    }

    const checkboxChange = (e) => {
        let tempPlot = {...plotModel};
        tempPlot[e.target.name] = e.target.checked;
        setPlotModel(tempPlot);
    }

    const onSubmit = () => {
        setPlot(plotModel)
        .then(() => {
            navigate(0);
        });
    }

    const addedTenants = plotModel.tenants.map(
        tenantNickName => <li>{ tenantNickName }</li>
    ) 

    if (!plotList){
        return (
            <Loading />
        );
    }

  return (
    <div className='form-container'>
        <div className='form'>
            <header>{getHeading()}</header>
            <div className='form-group'>
            <label>Id</label>
            <input type='text'  className="form-input" name='id' value={plotModel.id} onChange={onChange} />
            </div>
            <div className='form-group'>
                <label>Area (m&#178;)</label>
                <input type='number'  className="form-input" name='area' value={plotModel.area} onChange={onChange} />
            </div>
            <div className='form-group'>
                <label>Occupied</label>
                <input type='checkbox'  className="form-input" name='occupied' checked={plotModel.occupied} onChange={checkboxChange} />
            </div>
            <div className='form-group'>
                <label>Distance (m)</label>
                <input type='number'  className="form-input" name='distance' value={plotModel.distance} onChange={onChange} />
            </div>
            <div className='form-group'>
                <label>Gradient</label>
                <select className="form-input" name='gradient' value={plotModel.gradient} onChange={onChange}>
                    <option value="Slope">Slope</option>
                    <option value="Flat">Flat</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Fee</label>
                <input type='number' className="form-input" name='fee' value={plotModel.fee} onChange={onChange} ></input>
            </div>
            <button className="submit" onClick={() => onSubmit()}>Submit</button>
        </div>
    </div>
  )
}
