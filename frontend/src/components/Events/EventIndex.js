import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents,deleteEvent } from '../../store/events';
import { Link } from 'react-router-dom';
import './Event.css'
import { removeCurrentSchedule} from '../../store/schedules';
import {MdAutoDelete} from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'


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
        dispatch(removeCurrentSchedule())
    },[])
    if (!userEvents) return null;

    const handleDelete = async (eventId) => {
        await dispatch(deleteEvent(eventId));
        dispatch(fetchUserEvents(user._id));
    };

    return (
        <>
            <div className="main-page-full-calendar">
                <div>
                    <div className="circles-and-rings">
                        <div className="rings">
                            <div class="ring ring-one"></div>
                            <div class="ring ring-two"></div>
                            <div class="ring ring-three"></div>
                            <div class="ring ring-four"></div>
                        </div>
                        <div className="circles">
                            <div class="circle circle-one"></div>
                            <div class="circle circle-two"></div>
                            <div class="circle circle-three"></div>
                            <div class="circle circle-four"></div>
                        </div>
                    </div>
                    <div class="main-page-calendar-header">
                        { userEvents.length > 0 ?
                        (<h2 className="event-page-title upcoming-events-title">Your Upcoming Events</h2>) :
                        (<h2 className="event-page-title upcoming-events-title">No Upcoming Events</h2>)}

                    </div>
                </div>
                <div className='event-positioning'>
                    {userEvents.map(event => 
                        <Link to={`/event/${event._id}`} className='event-title-info'>
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
                                            <li onClick={() => handleDelete(event._id)} className='delete-button'> <MdAutoDelete/></li>
                                        </div>
                                    </ul>
                            </div>
                        </Link>
                    )}
                </div>
                <Link to="/event/new" className="main-page-calendar-footer">
                    <div class="event-index-create-event">
                            {/* <div className="plus-sign"> */}
                                <AiOutlinePlus/> 
                            {/* </div> */}
                            Create New Event
                    </div>
                </Link>
            </div>
        </>
    );
};

export default EventIndex;