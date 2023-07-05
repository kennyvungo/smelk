import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../../store/events';
import Calendar from '../Calendar/Calendar';

const EventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  const [eventName, setEventName] = useState('');
  const [eventDates, setEventDates] = useState([]);
  const [eventStartTime, setEventStartTime] = useState('12:00 AM');
  const [eventEndTime, setEventEndTime] = useState('12:00 AM');
  
  const hours = Array.from({ length: 24 }, (v, i) => {
    const period = i < 12 || i === 24 ? 'AM' : 'PM';
    const twelveHourFormat = i === 0 ? 12 : i < 13 ? i : i - 12;
    return `${twelveHourFormat}:00 ${period}`;
  });

  const handleDatesChange = (dates) => {
    setEventDates(dates); // Update the eventDates state with the selected dates from the Calendar component
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('eventDates:', eventDates); // Check the value of eventDates before creating the event

    const newEvent = {
      owner: user._id,
      name: eventName,
      dates: eventDates,
      dailyEventStartTime: eventStartTime,
      dailyEventEndTime: eventEndTime,
    };

    console.log('newEvent:', newEvent); // Check the newEvent object before dispatching

    const createdEvent = await dispatch(createEvent(newEvent));
    // console.log('New Event: ', newEvent);  //test object in console and see
    if (createdEvent) {
      history.push('/event/' + createdEvent.event._id);
    }

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
            <Calendar onDatesChange={handleDatesChange}/>
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