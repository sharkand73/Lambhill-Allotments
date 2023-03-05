// Libraries
import React from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
// Utilities

// Components

// Styles


export default function Plot() {

    const { id } = useParams();
    const context = useOutletContext();
    const plots = context.plots;
    let plot = null;
    if (plots){
    plot = plots.find(p => p.id === id);
    }

    if (!plot) return <div>Error!</div>

    return (
        <div className='form-container'>
            <div className='form'>
                <header>{plot.id}</header>
                <div className='form-group'>
                    <label>Id</label>
                    <input type='text' disabled={true} className="form-input" name='id' value={plot.id}  />
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <input type='text' disabled={true} className="form-input" name='description' value={plot.description}  />
                </div>
                <div className='form-group'>
                    <label>Area (m&#178;)</label>
                    <input type='number' disabled={true} className="form-input" name='area' value={plot.area}  />
                </div>
                <div className='form-group'>
                    <label>Occupied</label>
                    <input type='checkbox' disabled={true} className="form-input" name='occupied' checked={plot.occupied} />
                </div>
                <div className='form-group'>
                    <label>Distance (m)</label>
                    <input type='number' disabled={true} className="form-input" name='distance' value={plot.distance}  />
                </div>
                <div className='form-group'>
                    <label>Gradient</label>
                    <input type='text' className="form-input" disabled={true} name='gradient' value={plot.gradient} />
                </div>
                <div className='form-group'>
                    <label>Fee</label>
                    <input type='number' className="form-input" disabled={true} name='fee' value={plot.fee}  ></input>
                </div>
                <div className='form-group'>
                    <label>Tenants</label>
                    <input type='text' className="form-input" disabled={true} name='fee' value={plot.tenants.join(', ')}  ></input>
                </div>
            </div>
        </div>
    )
}
