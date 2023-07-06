import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createSchedule } from '../../store/schedules';
import './ScheduleUsers.css'

const ScheduleUsers = ({event}) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const responses = useSelector(state => state.events.current.responses)
    const [currentSchedule, setCurrentSchedule] = useState('')
    
    const sendCreateSchedule = () => {
        const schedule = {
            fname: firstName,
            lname: lastName,
            eventId: event["_id"],
            dailySchedule: event.emptySchedule
        };
        // console.log(schedule);
        dispatch(createSchedule(schedule));
    }

    return (
        <div className="schedule-users-container">
            <h1 className='schedule-users-header-text'>Enter your name to add your availability</h1>
            <label className='schedule-label'>First name
            </label>
                <input className="schedule-input"
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}></input>
            <label className='schedule-label'>Last name
            </label>
                <input className="schedule-input"
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}></input>
            <button className='create-schedule-button' onClick={sendCreateSchedule}>Add schedule</button>
            <div className="schedule-users-splitter">
                <hr></hr>
                <span className='schedule-users-splitter-text'> OR </span>
                <hr></hr>
            </div>
            <div className="schedule-users-buttons-container">
                <h1 className='schedule-users-header-text'>Select your name below</h1>
                {responses.map(user => (
                    <div className='user-button-container' key={event["_id"] + user}>
                        <button className='user-button'>{user.fname + " " + user.lname}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScheduleUsers;