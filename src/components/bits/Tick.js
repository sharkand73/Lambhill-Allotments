import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Tick({ bool }) {
  return (
    <>
      {bool && <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} />}
    </>    
  )
}
