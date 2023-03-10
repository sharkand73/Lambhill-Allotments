import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Back() {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} style={{color: 'white', backgroundColor: 'black', padding: '2px', width: '40px'}}>
        <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  )
}
