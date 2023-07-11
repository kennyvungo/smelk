import React, { useState, useEffect } from 'react';
import './Grid.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrSchedule,updateSchedule,fetchAggSchedule } from '../../store/schedules';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
function Grid({ event }) {
    const dispatch = useDispatch();
    const [grid, setGrid] = useState({});
    useEffect(() => {
        let startTime = new Date("1970-01-01 " + event.dailyEventStartTime).getHours();
        let endTime = new Date("1970-01-01 " + event.dailyEventEndTime).getHours();
        let hoursArray = Array.from({length: ((endTime - startTime) * 2)}, (_, i) => startTime + (i * 0.5));
        let tempGrid = event.dates.reduce((acc, date) => {
            acc[dateConverter(date)] = hoursArray.reduce((timeSlots, hour) => {
                const formattedTime = convertTo12HourFormat(hour);
                timeSlots[formattedTime] = false;
                return timeSlots;
            }, {});
            return acc;
        }, {});
        setGrid(tempGrid);
    }, [event]);
    const {id} = useParams();
    const handleTimeSlotClick = (date, time) => {
        curschedule.dailySchedule[date][time] = !curschedule.dailySchedule[date][time]
        dispatch(updateSchedule(curschedule))
        dispatch(fetchAggSchedule(id))
    };
    const curschedule = useSelector(getCurrSchedule)
    if (curschedule && curschedule.fname) {
        return (
            <div className='grid-container'>
                <h1 className='gridheader'>{curschedule.fname}'s Schedule</h1>
            <div className='grid'>
                {Object.entries(curschedule.dailySchedule).map(([date, timeSlots]) => (
                    <div className='grid-row' key={date}>
                        <div className='date-header'>{getDayOfWeek(dateConverter(date))} </div>
                        <div className='date-header'>{dateConverter(date)}</div>
                        {Object.entries(timeSlots).map(([time, selected]) => (
                            <div
                            className='grid-cell'
                            key={time}
                            onClick={() => handleTimeSlotClick(date, time)}
                            style={{backgroundColor: selected ? '#A98DE2' : '#CBC3E3'}}
                            >
                                {time}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
        );
    } else {
        return null
    }
}
export default Grid;
//helper function to convert time
const convertTo12HourFormat = (time) => {
    let hour = Math.floor(time);
    let minute = (time % 1) > 0 ? 30 : 0;
    let amPm = hour >= 12 ? 'PM' : 'AM';
    if (hour === 0) {
        hour = 12;
    } else if (hour > 12) {
        hour -= 12;
    }
    return `${hour}:${minute === 0 ? '00' : '30'} ${amPm}`;
}
//helper function to get day of week
const dateConverter = (str) => {
    return str.slice(5,7) + "/" + str.slice(8,10) + "/" + str.slice(0,4);
 }

const getDayOfWeek = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(date).getDay()];
}

