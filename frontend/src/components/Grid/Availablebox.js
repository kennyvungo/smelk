import React, {useState} from 'react'

const AvailableBox = ({avail,unavail,isHovering}) => {
  return (
    isHovering ? 
    <div className='available-wrapper'>
        <div className='avails'>
          <h1>{`Available (${avail.filter(e => e !== null).length})`}</h1>
            {avail.map(name =>  <ul> {name}</ul>)}
        </div>
        <div className='unavails'>
          <h1>{`Unvailable (${unavail.filter(e => e !== null).length})`}</h1>
            {unavail.map(name => <ul> {name}</ul>)}
        </div>
    </div> : null
  )
}

export default AvailableBox