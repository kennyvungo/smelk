import React, { useState, useEffect } from 'react';
import './Grid.css';
import { useDispatch } from 'react-redux';
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
    const handleTimeSlotClick = (date, time) => {
        
        // let newGrid = {...grid};
        // newGrid[date][time] = !newGrid[date][time];
        // setGrid(newGrid);
    };
    if (grid) {
        return (
            <div className='grid'>
                {Object.entries(grid).map(([date, timeSlots]) => (
                    <div className='grid-row' key={date}>
                        <div className='date-header'>{getDayOfWeek(date)} </div>
                        <div className='date-header'>{date}</div>
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
        );
    } else {
        <h1>loading...</h1>
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
const getDayOfWeek = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(date).getDay()];
}


const dateConverter = (str) => {
    return str.slice(5,7) + "/" + str.slice(8,10) + "/" + str.slice(0,4);
 }