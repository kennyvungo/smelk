import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createSchedule, deleteSchedule, fetchAggSchedule, fetchSchedule, removeCurrentSchedule } from '../../store/schedules';
import { TiUserDelete } from "react-icons/ti";
import './ScheduleUsers.css'
import { FaExclamation } from 'react-icons/fa';

const ScheduleUsers = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const event = useSelector(state => state.events.current)
    const schedule = useSelector(state => state.schedules.current)
    const resNamesArr = event.responses.map(user => user.fname + user.lname)
    
    const getSchedule = (fname, lname) => {
        dispatch(fetchSchedule(fname, lname, event["_id"]))
    }

    const sendDeleteSchedule = () => {
        // console.log(schedule);
        dispatch(deleteSchedule(schedule["_id"]))
        dispatch(fetchAggSchedule(event["_id"]))
    }
    
    const sendCreateSchedule = () => {
        const schedule = {
            fname: firstName,
            lname: lastName,
            eventId: event["_id"],
            dailySchedule: event.emptySchedule
        };
        // console.log(schedule);
        dispatch(createSchedule(schedule));
        setFirstName('')
        setLastName('')
    }

    return (
        <div className="schedule-users-container">
            <h1 className='schedule-users-header-text'>Enter your name to add your availability</h1>
            <label className='schedule-label'>First name</label>
                <input className="schedule-input"
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}></input>
            <label className='schedule-label'>Last name</label>
                <input className="schedule-input"
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}></input>
            <div className='name-error'>
                <>
                {resNamesArr.includes(firstName + lastName) && <FaExclamation /> }
                {resNamesArr.includes(firstName + lastName) && "That name already has a schedule" }
                </>
            </div>
            <button className='create-schedule-button' onClick={sendCreateSchedule} disabled={firstName === '' || lastName==='' || resNamesArr.includes(firstName+lastName)}>Add schedule</button>
            <div className="schedule-users-splitter">
                <hr></hr>
                <span className='schedule-users-splitter-text'> OR </span>
                <hr></hr>
            </div>
            <h1 className='schedule-users-header-text'>Select your name below</h1>
            <div className="schedule-users-buttons-container">
                {event.responses && event.responses.map(user => ( 
                    <div className='user-button-container' key={`${event["_id"]}${user.fname}${user.lname}`}>
                        <button className={schedule && schedule.fname === user.fname && schedule.lname === user.lname ? 'selected-button user-button' : 'whole-user-button'}
                            onClick={() => getSchedule(user.fname, user.lname)}>
                            {user.fname + " " + user.lname}
                        </button>
                        <button 
                            onClick={sendDeleteSchedule}
                            className={schedule && schedule.fname === user.fname && schedule.lname === user.lname ? 'selected-button delete-schedule-button' : 'hidden'}>
                            {schedule && schedule.fname === user.fname && schedule.lname === user.lname ? <TiUserDelete size="4x" /> : <></> }
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScheduleUsers;