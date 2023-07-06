import './ScheduleUsers.css'

const ScheduleUsers = () => {
    return (
        <div className="schedule-users-container">
            <h1 className='schedule-users-header-text'>Enter your name to add your availability</h1>
            <label className='schedule-label'>First name:
                <input className="schedule-input"></input>
            </label>
            <label className='schedule-label'>Last name:
                <input className="schedule-input"></input>
            </label>
            <button className='create-schedule-button'>Add schedule</button>
            <div className="schedule-users-splitter">
                <hr></hr>
                <span className='schedule-users-splitter-text'> OR </span>
                <hr></hr>
            </div>
            <div className="schedule-users-button-container">
                <h1 className='schedule-users-header-text'>Select your name below</h1>
            </div>
        </div>
    )
}

export default ScheduleUsers;