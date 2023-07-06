import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAggSchedule } from '../../store/schedules';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './Grid.css';

//helper function to convert time
const convertTo12HourFormat = (time) => {
    if(time === 0) {
        return "12:00 AM";
    }
    else if(time < 12) {
        return `${time}:00 AM`;
    }
    else if(time === 12) {
        return "12:00 PM";
    }
    else {
        return `${time-12}:00 PM`;
    }
}

function AggGrid({ event }) {
    const [grid, setGrid] = useState([]);
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAggSchedule(id))
    },[dispatch,id])

    useEffect(() => {
        let startTime = new Date("1970-01-01 " + event.dailyEventStartTime).getHours();
        let endTime = new Date("1970-01-01 " + event.dailyEventEndTime).getHours();
        let hoursArray = Array.from({length: ((endTime - startTime) * 2)}, (_, i) => startTime + (i * 0.5));
    
        let tempGrid = [[{time: '', selected: false}, ...event.dates.map(date => new Date(date).toLocaleDateString())], ...hoursArray.map(hour => {
            return [{time: hour, selected: false}, ...event.dates.map(date => {
                return {
                    time: hour,
                    selected: false
                };
            })];
        })];
    
        setGrid(tempGrid);
    }, [event]);

    const handleTimeSlotClick = (rowIndex, colIndex) => {
        if(rowIndex > 0 && colIndex > 0) {
            let newGrid = [...grid];
            newGrid[rowIndex][colIndex].selected = !newGrid[rowIndex][colIndex].selected;
            setGrid(newGrid);
        }
    };

    return (
        <div className='grid'>
            {grid.map((row, rowIndex) => (
                <div className='grid-row' key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <div 
                            className='grid-cell' 
                            key={colIndex} 
                            onClick={() => handleTimeSlotClick(rowIndex, colIndex)}
                            style={{backgroundColor: rowIndex === 0 || colIndex === 0 ? 'white' : cell.selected ? 'green' : 'white'}}
                        >
                            {rowIndex === 0 && colIndex !== 0 ? cell : colIndex === 0 && rowIndex !== 0 && Number.isInteger(cell.time) ? convertTo12HourFormat(cell.time) : ""}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default AggGrid;