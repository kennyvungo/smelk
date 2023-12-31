import React, { useCallback } from 'react'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../store/events';
import { useHistory} from 'react-router-dom';
import { updateEvent } from '../../store/events';
import Calendar from '../Calendar/Calendar';
import './Event.css'
import jwtFetch from '../../store/jwt';
import { debounce } from 'lodash';

const EventForm = ({ eventId} ) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const allEvents = useSelector(state => state.events.user);
  const event = allEvents?.find(e => e._id === eventId);
  const [eventName, setEventName] = useState(event ? event.name : "");
  const [eventDates, setEventDates] = useState(event ? event.dates : []);
  const [eventStartTime, setEventStartTime] = useState(event ? event.dailyEventStartTime : "12:00 AM");
  const [eventEndTime, setEventEndTime] = useState(event ? event.dailyEventEndTime : "1:00 AM");
  const [setting, setSetting] = useState('')
  const [energy, setEnergy] = useState('')
  const [people, setPeople] = useState(0)
  const [settingButton, setSettingButton] = useState(3)
  const [energyButton, setEnergyButton] = useState(3)
  const [hidden, setHidden] = useState(true)
  const [eventOne, setEventOne] = useState("")
  const [eventTwo, setEventTwo] = useState("")
  const [eventThree, setEventThree] = useState("")
  const [dateError,setdateError] = useState(false);


  const generateQuery = async () => {
    const response = await jwtFetch("/api/events/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ people: people, setting: setting, energy: energy })
    })
    const data = await response.json()
    return data.response.trim();
  }

  const hours = Array.from({ length: 24 }, (v, i) => {
    const period = i < 12 || i === 24 ? "AM" : "PM";
    const twelveHourFormat = i === 0 ? 12 : i < 13 ? i : i - 12;
    return `${twelveHourFormat}:00 ${period}`;
  });

  const search = element => element === eventStartTime;
  const indexStart = hours.findIndex(search)
  const filtered_hours = hours.slice(indexStart + 1)

  const handleDatesChange = (dates) => {
    setEventDates(dates); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(eventDates.length === 0){
      setdateError(true);
    }
    else{
      const newEvent = {
        owner: user._id,
        name: eventName,
        dates: eventDates,
        dailyEventStartTime: eventStartTime,
        dailyEventEndTime: eventEndTime,
      };
      
      let savedEvent;
      
      if (eventId) {
        savedEvent = await dispatch(updateEvent(eventId, newEvent));
        if (savedEvent) {
          history.push("/event/" + eventId);
        }
      } else {
        savedEvent = await dispatch(createEvent(newEvent));
        if (savedEvent) {
          history.push("/event/" + savedEvent.event._id);
        }
      }
      
    }
  }

  const [canClick, setCanClick] = useState(true);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    const eventArr = query.split(",");
    setEventOne(eventArr[0]);
    setEventTwo(eventArr[1]);
    setEventThree(eventArr[2]);
    if (hidden) {
      setHidden(false)
    }
  };
  
  return (
    <div className="create-event-page">
      <span className='login-background event-form-container'>
        <h2 className='event-form-title'>Need ideas?</h2>
          <form className='event-form chat-gpt-form' onSubmit={handleChatSubmit}>
              <h3 className="chat-subheading">What type of setting?</h3>
              <input
                  required
                  type="text"
                  placeholder="ex. inside or outside?"
                  onChange={(e) => setSetting(e.target.value)}
              />
              {/* <button className={settingButton === 0 ? 'demo-button clicked-button left-button' : 'demo-button left-button'} type="button" onClick={() => {setSetting("inside");setSettingButton(0)}}>Inside</button>
              <button className={settingButton === 1 ? 'demo-button clicked-button right-button' : 'demo-button right-button'} type="button" onClick={() => {setSetting("outside");setSettingButton(1)}}>Outside</button> */}
              <br />
              <br />
              <h3 className="chat-subheading">What vibe are you going for?</h3>
              <input
                  required
                  type="text"
                  placeholder="ex. active or chill?"
                  onChange={(e) => setEnergy(e.target.value)}
              />
              {/* <button className={energyButton === 0 ? 'demo-button clicked-button left-button' : 'demo-button left-button'} type="button" onClick={() => {setEnergy("active");setEnergyButton(0)}}>Active</button>
              <button className={energyButton === 1 ? 'demo-button clicked-button right-button' : 'demo-button right-button'} type="button" onClick={() => {setEnergy("chill");setEnergyButton(1)}}>Chill</button> */}
              <br />
              <br />
              <h3 className="chat-subheading">How many people are you thinking?</h3>
              <input
                  required
                  type="text"
                  placeholder="# people"
                  onChange={(e) => setPeople(e.target.value)}
              />
              <br />
              <br />
              <button className='demo-button chat-gpt-submit' name="chatSubmit" type="submit">Find Us Something To Do</button>
          </form>
          <h3 className={hidden ? 'chat-subheading hidden' : 'chat-subheading'}>Our suggestions</h3>
          <div className='chat-result-buttons-container'>
            <button className={hidden ? 'demo-button hidden' : 'demo-button chat-result-button'} onClick={() => setEventName(eventOne)}>{eventOne}</button>
            <button className={hidden ? 'demo-button hidden' : 'demo-button chat-result-button'} onClick={() => setEventName(eventTwo)}>{eventTwo}</button>
            <button className={hidden ? 'demo-button hidden' : 'demo-button chat-result-button'} onClick={() => setEventName(eventThree)}>{eventThree}</button>
          </div>
      </span>
      <span className='event-form-container login-background'>
          <form className='event-form chat-gpt-form' onSubmit={handleSubmit}>
              <h2 className='event-form-title'>
                {eventId ? 'Update Event' : 'Create Event'}
              </h2>
              {dateError && <div className='errors'>Need to select dates</div>}
              <div className='event-form-input'>
                    <label>
                      <span className='availability-subheader'>Event Name</span>
                      <input
                        type="text"
                        value={eventName}
                        onChange={e => setEventName(e.target.value)}
                        required
                      />
                    </label>
                    <br/>
                    <label>
                      <Calendar eventDates={eventDates} onDatesChange={handleDatesChange}/>
                    </label>
                    <br/>
                    <label>
                      <span className='availability-subheader'>Availability start time</span>
                      <select value={eventStartTime} onChange={e => setEventStartTime(e.target.value)}>
                        {hours.map(hour => (
                          <option key={hour} value={hour}>{hour}</option>
                        ))}
                      </select>
                    </label>
                    <br/>
                    <label>
                      <span className='availability-subheader'>Availability end time</span>
                      <select value={eventEndTime} onChange={e => setEventEndTime(e.target.value)}>
                        {filtered_hours.map(hour => (
                          <option key={hour} value={hour}>{hour}</option>
                        ))}
                      </select>
                    </label>
                    <br/>
                    <button className='demo-button chat-gpt-submit' type="submit">
                      {eventId ? 'Update Event' : 'Create Event'}
                    </button>
              </div>
          </form>
      </span>
    </div>
  )
}
export default EventForm;