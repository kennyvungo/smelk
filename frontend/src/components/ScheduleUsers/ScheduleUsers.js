import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createSchedule, fetchSchedule } from '../../store/schedules';
import {FiX} from 'react-icons/fi'
import './ScheduleUsers.css'

const ScheduleUsers = ({event}) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const responses = useSelector(state => state.events.current.responses)
    const schedule = useSelector(state => state.schedules.current)
    
    
    const getSchedule = (fname, lname) => {
        dispatch(fetchSchedule(fname, lname, event["_id"]))
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
            <button className='create-schedule-button' onClick={sendCreateSchedule} disabled={firstName === '' || lastName===''}>Add schedule</button>
            <div className="schedule-users-splitter">
                <hr></hr>
                <span className='schedule-users-splitter-text'> OR </span>
                <hr></hr>
            </div>
            <h1 className='schedule-users-header-text'>Select your name below</h1>
            <div className="schedule-users-buttons-container">
                {responses && responses.map(user => (
                    <>
                        <button className='user-button-container' key={event["_id"] + user}>
                            <div className={schedule && schedule.fname === user.fname ? 'selected-button user-button left-button' : 'user-button left-button'}
                                onClick={() => getSchedule(user.fname, user.lname)}>
                                {user.fname + " " + user.lname}
                            </div>
                        </button>
                        <button className='right-button' ><FiX /></button>
                    </>
                ))}
            </div>
        </div>
    )
}

export default ScheduleUsers;