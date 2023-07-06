import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../store/events';
import { useHistory } from 'react-router-dom';
import Calendar from '../Calendar/Calendar';
import './Event.css'
import ChatGPTEvent from './ChatGPTEvent';
import jwtFetch from '../../store/jwt';

const EventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [eventName, setEventName] = useState("");
  const [eventDates, setEventDates] = useState([]);
  const [eventStartTime, setEventStartTime] = useState("12:00 AM");
  const [eventEndTime, setEventEndTime] = useState("12:00 AM");
  const [setting, setSetting] = useState('')
  const [energy, setEnergy] = useState('')
  const [people, setPeople] = useState(0)
  const [settingButton, setSettingButton] = useState(3)
  const [energyButton, setEnergyButton] = useState(3)
  const [hidden, setHidden] = useState(true)
  const [eventOne, setEventOne] = useState("")
  const [eventTwo, setEventTwo] = useState("")
  const [eventThree, setEventThree] = useState("")

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

  const handleDatesChange = (dates) => {
    setEventDates(dates); // Update the eventDates state with the selected dates from the Calendar component
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      owner: user._id,
      name: eventName,
      dates: eventDates,
      dailyEventStartTime: eventStartTime,
      dailyEventEndTime: eventEndTime,
    };

    const createdEvent = await dispatch(createEvent(newEvent));
    if (createdEvent) {
      history.push("/event/" + createdEvent.event._id);
    }
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted")
    console.log(setting)
    console.log(energy)
    console.log(people)

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
              <h3 className="chat-subheading">Choose your setting</h3>
              <button className={settingButton === 0 ? 'demo-button clicked-button left-button' : 'demo-button left-button'} type="button" onClick={() => {setSetting("inside");setSettingButton(0)}}>Inside</button>
              <button className={settingButton === 1 ? 'demo-button clicked-button right-button' : 'demo-button right-button'} type="button" onClick={() => {setSetting("outside");setSettingButton(1)}}>Outside</button>
              <br />
              <br />

              <h3 className="chat-subheading">What vibe are you going for?</h3>
              <button className={energyButton === 0 ? 'demo-button clicked-button left-button' : 'demo-button left-button'} type="button" onClick={() => {setEnergy("active");setEnergyButton(0)}}>Active</button>
              <button className={energyButton === 1 ? 'demo-button clicked-button right-button' : 'demo-button right-button'} type="button" onClick={() => {setEnergy("chill");setEnergyButton(1)}}>Chill</button>
              <br />
              <br />

              <h3 className="chat-subheading">How many people are you thinking?</h3>
              <input 
                  type="text"
                  placeholder="# people"
                  onChange={(e) => setPeople(e.target.value)}
              />
              <br />
              <br />

              <button className='demo-button chat-gpt-submit' type="submit">Find Us Something To Do</button>
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
              <h2 className='event-form-title'>Create Event</h2>
              
              <div className='event-errors'></div>

              <div className='event-form-input'>
                    <label>
                      <span className='availability-subheader'>Event Name</span>
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
                        {hours.map(hour => (
                          <option key={hour} value={hour}>{hour}</option>
                        ))}
                      </select>
                    </label>
                    <br/>
                    <button className='demo-button chat-gpt-submit' type="submit">Create Event</button>
              </div>

          </form>
      </span>
    </div>
  )
}
export default EventForm;