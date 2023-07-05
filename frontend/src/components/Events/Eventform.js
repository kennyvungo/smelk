import React from 'react'
import { useEffect,useState } from 'react';

const EventForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <>
    <form className='event-form' onSubmit={handleSubmit}>
       <h2>Create Event</h2>
       <div className='eventerrors'></div>
       <label>
        <span>Event Name</span>
        <input type="text"
        />
       </label>
       <label>
        <span>

        </span>
       </label>
       <input 
        type="submit"
        value="Create Event"
       />
    </form>
    </>
  )
}

export default EventForm