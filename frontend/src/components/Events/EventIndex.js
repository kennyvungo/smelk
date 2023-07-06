import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents } from '../../store/events';
import './Event.css'


function EventIndex() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userEvents = useSelector(state => state.events.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserEvents(user._id));
        }
    }, [dispatch, user]);

    if (!userEvents) return null;

    return (
        <>
            <div className='event-index-container'>
                <h2 className="event-page-title">Your Upcoming Events!</h2>
                        {Object.values(userEvents).map(event => (
                            <div key={event._id} className="event-index-input">
                                {event.name}
                            </div>
                        ))}
            </div>
        </>
    );
};

export default EventIndex;