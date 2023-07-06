import { useState } from 'react'
import './ScheduleUsers.css'

const ScheduleUsers = ({event}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [users, setUsers] = useState(["Lauren Cary"])
    
    const createSchedule = () => {
        setUsers = [...users, ...firstName + ' ' + lastName]
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
            <button className='create-schedule-button' onClick={createSchedule}>Add schedule</button>
            <div className="schedule-users-splitter">
                <hr></hr>
                <span className='schedule-users-splitter-text'> OR </span>
                <hr></hr>
            </div>
            <div className="schedule-users-buttons-container">
                <h1 className='schedule-users-header-text'>Select your name below</h1>
                {users.map(user => (
                    <div className='user-button-container' key={user}>
                        <button className='user-button'>{user}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScheduleUsers;