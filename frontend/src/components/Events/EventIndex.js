import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents,deleteEvent } from '../../store/events';
import { Link } from 'react-router-dom';
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

    const handleDelete = async (eventId) => {
        await dispatch(deleteEvent(eventId));
        dispatch(fetchUserEvents(user._id));
    };

    return (
        <>
            <div className='event-index-container'>
                { userEvents.length > 0 ? (
                <h2 className="event-page-title">Your Upcoming Events!</h2>) : <h2 className="event-page-title">No Upcoming Events</h2> }
                        {Object.values(userEvents).map(event => (
                            <div key={event._id} className="event-index-input">
                                {event.name}
                                <ul>
                                    <Link to={`/event/edit/${event._id}`}><li> Edit</li></Link>
                                    <li onClick={() => handleDelete(event._id)}> Delete</li>
                                </ul>
                            </div>
                        ))} 
            </div>
        </>
    );
};

export default EventIndex;