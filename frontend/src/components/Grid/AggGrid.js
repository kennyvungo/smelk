import React, { useState, useEffect } from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { fetchAggSchedule,getAggSchedule } from '../../store/schedules';
import './Grid.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

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
const dateConverter = (str) => {
    return str.slice(5,7) + "/" + str.slice(8,10) + "/" + str.slice(0,4);
 }
function AggGrid({ event }) {
    const [isLoaded,setisLoaded] = useState(false);
    const {id} = useParams();
    const [grid, setGrid] = useState({});
    const aggie = useSelector(getAggSchedule(id))
    let aggregate = {};
    if(aggie){
        const dates = Object.keys(aggie.dates).sort()
        
        dates.forEach((day) => {
            aggregate[dateConverter(day)] = aggie.dates[day]
        })
    }

    useEffect(() => {
        let startTime = new Date("1970-01-01 " + event.dailyEventStartTime).getHours();
        let endTime = new Date("1970-01-01 " + event.dailyEventEndTime).getHours();
        let hoursArray = Array.from({length: ((endTime - startTime) * 2)}, (_, i) => startTime + (i * 0.5));
        if(aggie && grid){
            setisLoaded(true);
        }
        let tempGrid = event.dates.reduce((acc, date) => {
            acc[dateConverter(date)] = hoursArray.reduce((timeSlots, hour) => {
                const formattedTime = convertTo12HourFormat(hour);
                if(formattedTime){
                    timeSlots[formattedTime] = (aggregate[(dateConverter(date))] || {})[formattedTime];
                }
                return timeSlots;
            }, {});
            return acc;
        }, {});
        setGrid(tempGrid);
    }, [event,aggie]);
    const handleTimeSlotClick = (date, time) => {
        let newGrid = {...grid};
        newGrid[date][time] = !newGrid[date][time];
        setGrid(newGrid);
    };

    if (isLoaded) {
        return (
            <div className='grid'>
                {Object.entries(grid).map(([date, timeSlots]) => (
                    <div className='grid-row' key={date}>
                        <div className='date-header'>{getDayOfWeek(date)} </div>
                        <div className='date-header'>{date}</div>
                        {Object.entries(timeSlots).map(([time, avaarr]) => {
                            if(avaarr){
                            let ratio = 1 - (numNonNulls(avaarr.available) / avaarr.available.length)
                            let r = (168 * ratio) + 168;
                            let g = (141 * ratio) + 141;
                            let b = (225 * ratio) + 225;
                            return(
                            <div
                                className='agg-cell'
                                key={time}
                                style={{backgroundColor: `rgb(${r},${g},${b})`}}
                            >
                                {time}
                            </div>)
                            }

                            })}
                    </div>
                ))}
            </div>
        );
    } else {
        <h1>loading...</h1>
    }
}
export default AggGrid;


//helper func
const numNonNulls = (arr) => (
    arr.filter((ind) => ind != null).length
)
const numNulls = (arr) =>(
    arr.filter(ind => ind === null).length
)

const getDayOfWeek = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(date).getDay()];
}
























