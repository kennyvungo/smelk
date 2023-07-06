import React, { useState, useEffect } from 'react';
import './Grid.css';

function Grid({ event }) {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        let startTime = new Date("1970-01-01 " + event.dailyEventStartTime).getHours();
        let endTime = new Date("1970-01-01 " + event.dailyEventEndTime).getHours();
        let hoursArray = Array.from({length: ((endTime - startTime) * 2)}, (_, i) => startTime + (i * 0.5));

        let tempGrid = [event.dates.map(date => new Date(date).toLocaleDateString()), ...hoursArray.map(hour => {
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
                            style={{backgroundColor: cell.selected ? 'green' : 'red'}}
                        >
                            {rowIndex === 0 ? cell : colIndex === 0 && Number.isInteger(cell.time) ? cell.time : ""}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;
