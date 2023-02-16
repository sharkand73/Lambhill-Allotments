import React from 'react'

export default function PersonDetail({ personModel, handleChange, waitingList, editing }) {
  return (
    <>
        <div className='form-group'>
            <label>First name</label>
            <input type='text' disabled={!editing} className="form-input" name='firstName' value={personModel.firstName} onChange={handleChange} />
        </div>
        <div className='form-group'>
            <label>Last name</label>
            <input type='text' disabled={!editing} className="form-input" name='lastName' value={personModel.lastName} onChange={handleChange} />
        </div>
        {!waitingList && <div className='form-group'>
            <label>Date joined</label>
            <input type='date' disabled={!editing} className="form-input" name='dateJoined' value={personModel.dateJoined} onChange={handleChange} />
        </div>}
        {waitingList && <div className='form-group'>
            <label>Date joined</label>
            <input type='date' disabled={!editing} className="form-input" name='joinedWaitingList' value={personModel.joinedWaitingList} onChange={handleChange} />
        </div>}
        <div className='form-group'>
            <label>Address</label>
            <textarea type='text' disabled={!editing} className="form-input" name='address' value={personModel.address} onChange={handleChange} ></textarea>
        </div>
        <div className='form-group'>
            <label>Telephone</label>
            <input type='text' disabled={!editing} className="form-input" name='phoneNumber' value={personModel.phoneNumber} onChange={handleChange} />
        </div>
        <div className='form-group'>
            <label>Email</label>
            <input type='text' disabled={!editing} className="form-input" name='email' value={personModel.email} onChange={handleChange} />
        </div>
        <div className='form-group'>
            <label>Alt email</label>
            <input type='text' disabled={!editing} className="form-input" name='altEmail' value={personModel.altEmail} onChange={handleChange} />
        </div>
    </>
  )
}
