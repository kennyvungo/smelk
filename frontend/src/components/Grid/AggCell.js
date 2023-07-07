import React from 'react'
import { useState } from 'react';
import AvailableBox from './Availablebox';
const AggCell = ({time,avaarr,r,g,b}) => {

    const [isHovering,setIsHovering] = useState(false);
 
    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };
  return (
    <>
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
        className='agg-cell'
        key={time}
        style={{backgroundColor: `rgb(${r},${g},${b})`}}
        >   
        {time}
    </div>
    <div className='avail-container'>
       <AvailableBox avail={avaarr.available} unavail={avaarr.unavailable} isHovering={isHovering}/>
   </div>
    </>
  )
}

export default AggCell

const numNonNulls = (arr) => (
    arr.filter((ind) => ind != null).length
)
const numNulls = (arr) =>(
    arr.filter(ind => ind === null).length
)