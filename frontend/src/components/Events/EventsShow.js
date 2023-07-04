import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../../store/events';

function EventsShow() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.events.current);

    useEffect(() => {
        dispatch(fetchEvent(id));
    }, [dispatch, id]);

    return (
        <div>
            <h1>Event Details</h1>
            {event && (
                <div>
                    <h2>{event.name}</h2>
                    <p>Start Time: {event.dailyEventStartTime}</p>
                    <p>End Time: {event.dailyEventEndTime}</p>
                    <p>Dates: {event.dates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default EventsShow;