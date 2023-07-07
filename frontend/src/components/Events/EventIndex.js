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
                    <h2 className="event-page-title">Your Upcoming Events</h2> 
                </div>):
                (<div class="main-page-calendar-header">
                    <h2 className="event-page-title">No Upcoming Events</h2> 
                </div>)}
                {userEvents.map(event => 
                    <div key={event._id} className="event-index-input">
                        <div className="event-index-info">
                            <div>
                                <Link to={`/event/${event._id}`}>{event.name}</Link>
                            </div>
                            {event.responses.length > 0 ? `${event.responses.length} responses` : "No responses yet"}
                        </div>
                        <ul className="event-edit-delete-buttons">
                            <div className='edit-del-button'>
                                <Link to={`/event/edit/${event._id}`} className='edit-button'><li> Edit</li></Link>
                                <li onClick={() => handleDelete(event._id)} className='delete-button'> Delete</li>
                            </div>
                        </ul>
                    </div>
                )}
                <div class="main-page-calendar-footer">
                    <Link to="/event/new" className="event-page-title">Create New Event</Link>
                </div>
            </div>
        </>
    );
};

export default EventIndex;