import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../../store/events';

const EventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  const [eventName, setEventName] = useState('');
  const [eventDates, setEventDates] = useState('');
  const [eventStartTime, setEventStartTime] = useState('12:00 AM');
  const [eventEndTime, setEventEndTime] = useState('12:00 AM');
  
  const hours = Array.from({ length: 24 }, (v, i) => {
    const period = i < 12 || i === 24 ? 'AM' : 'PM';
    const twelveHourFormat = i === 0 ? 12 : i < 13 ? i : i - 12;
    return `${twelveHourFormat}:00 ${period}`;
  });

  const handleSubmit = (e) => {
      e.preventDefault();

      const newEvent = {
        owner: user._id,
        name: eventName,
        dates: eventDates,
        dailyEventStartTime: eventStartTime,
        dailyEventEndTime: eventEndTime,
    };
    // console.log('New Event: ', newEvent);  //test object in console and see
    dispatch(createEvent(newEvent)).then((createdEvent) => {
      history.push('/event/' + createdEvent._id);
    });
  }

  return (
    <>
      <form className='event-form' onSubmit={handleSubmit}>
          <h2>Create Event</h2>
          
          <div className='eventerrors'></div>

          <label>
            <span>Event Name</span>
            <input 
              type="text" 
              value={eventName} 
              onChange={e => setEventName(e.target.value)} 
            />
          </label>
          <br/>

          <label>
            <span>Dates Array:</span>
            <input 
              type="text"
              value={eventDates}
              onChange={e => setEventDates(e.target.value)} 
            />
          </label>
          <br/>

          <label>
            <span>Event Start time?</span>
            <select value={eventStartTime} onChange={e => setEventStartTime(e.target.value)}>
              {hours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </label>
          <br/>
          
          <label>
            <span>Event End time?</span>
            <select value={eventEndTime} onChange={e => setEventEndTime(e.target.value)}>
              {hours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </label>
          <br/>
          <input 
            type="submit"
            value="Create Event"
          />
      </form>
    </>
  )
}

export default EventForm;