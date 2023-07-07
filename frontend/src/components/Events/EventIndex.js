import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents,deleteEvent } from '../../store/events';
import { Link } from 'react-router-dom';
import './Event.css'
import { removeCurrentSchedule} from '../../store/schedules';

function EventIndex() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userEvents = useSelector(state => Object.values(state.events.user));

    useEffect(() => {
        if (user) {
            dispatch(fetchUserEvents(user._id));
        }
    }, [dispatch, user]);

    useEffect(() => {
        // dispatch(removeCurrentSchedule())
    },[])
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
                <div class="circle circle-one"></div>
                <div class="circle circle-two"></div>
                <div class="circle circle-three"></div>
                <div class="circle circle-four"></div>
                <div class="ring ring-one"></div>
                <div class="ring ring-two"></div>
                <div class="ring ring-three"></div>
                <div class="ring ring-four"></div>
                {/* <div class="ring ring-five"></div> */}


                {userEvents.map(event => 
                    <div key={event._id} className="event-index-input">
                        <div className="event-index-info">
                            <div>
                                <Link to={`/event/${event._id}`} className='event-title-info'>{event.name} </Link>
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
                    <Link to="/event/new" className="event-page-title event-index-create-event">Create New Event</Link>
                </div>
            </div>
        </>
    );
};

export default EventIndex;