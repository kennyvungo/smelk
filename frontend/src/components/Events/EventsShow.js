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
            <div className='event-show-container'>
                {event && (
                    <div className='event-show-header'>
                        <div className='left-header-div'></div>
                        <h2 className='event-show-event-name'>{event.name}</h2>
                        <div className='copy-container'>
                            <div className='copy-message'> Share The Link To Your Event! </div>
                            <button onClick={copy}className="copy-button" >{!copied ? "Copy URL" : "Copied!"}</button>
                        </div>
                    </div>
                )}
                <div className='event-show-content-container'>
                    {event && <ScheduleUsers />}
                    {event && <Grid event={event}/>}
                    {event && <AggGrid event={event}/>}
                </div>
            </div>
        </>
        );
}

export default EventsShow;