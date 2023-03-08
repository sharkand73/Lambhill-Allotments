import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Del({ onDelete, id }) {
  return (
    <div className='del' onClick={() => onDelete(id)}>
        <FontAwesomeIcon icon={faTrashCan} />
    </div>
  )
}
