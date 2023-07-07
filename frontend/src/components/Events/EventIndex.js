import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents,deleteEvent } from '../../store/events';
import { Link } from 'react-router-dom';
import './Event.css'


function EventIndex() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userEvents = useSelector(state => Object.values(state.events.user));

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
            <div >
                { userEvents.length > 0 ? 
                (<div class="main-page-calendar-header">
                    <h2 className="event-page-title">Your Upcoming Events!</h2> 
                </div>): 
                <h2 className="event-page-title">No Upcoming Events</h2> }
                {userEvents.map(event => (
                    <div key={event._id} className="event-index-input">
                        {event.name}
                        {event.dates[0]}
                        {event.responses.length > 0 ? event.responses.length : "No responses yet"}
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