import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../../store/events';
import Grid from '../Grid/Grid';
import './Event.css'
import ScheduleUsers from '../ScheduleUsers/ScheduleUsers';
import AggGrid from '../Grid/AggGrid';
import { fetchAggSchedule,getAggSchedule } from '../../store/schedules';

function EventsShow() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.events.current);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        dispatch(fetchEvent(id));
        dispatch(fetchAggSchedule(id))
    }, [dispatch, id]);

    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }
    

    return (
        <>  
            <div className='copy-message'> Share The Link To Your Event: </div>
            <button onClick={copy}className="copy-button" >{!copied ? "Copy URL" : "Copied!"}</button>
            <div className='event-show-container'>
                {/* <h1>Event Details</h1> */}
                {event && (
                    <div className='event-show-header'>
                        <h2 className='event-show-event-name'>{event.name}</h2>
                        {/* <p>Start Time: {event.dailyEventStartTime}</p>
                        <p>End Time: {event.dailyEventEndTime}</p>
                    <p>Dates: {event.dates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p> */}
                    </div>
                )}
                <div className='event-show-content-container'>
                    {event && <ScheduleUsers event={event} />}
                    {event && <Grid event={event}/>}
                    {event && <AggGrid event={event}/>}
                </div>
            </div>
        </>
        );
}

export default EventsShow;