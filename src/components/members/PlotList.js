// Libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
// Utilities
import { stringStartsWith } from '../../utilities/helper';
import { deletePerson } from '../../utilities/peopleRepository';
// Components
import Del from '../bits/Del';
// Styles
import '../../styles/people.css';
import '../../styles/list.css';


export default function PlotList() {

    // useEffect(() => updateList(), [filterText]);
    const navigate = useNavigate();
    const context = useOutletContext();

    const plots = context.plots;

    const listItem = (plot, index) => (
        <li className='plot-list-item' key={index}>
            <Link className='plot-link' to={plot.id}>
                {plot.id}
            </Link>
        </li>
    );

    let plotList = [];
    if (plots){
        plotList = plots.map((p, i) => listItem(p, i));
    }

  return (
    <div className='scrollable container'>  
        <ul className='plot-list'>
            { plotList }
        </ul>
    </div>
  )
}
