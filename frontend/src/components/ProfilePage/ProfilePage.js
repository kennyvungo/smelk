import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserEvents } from '../../store/events';
import { Link } from "react-router-dom";
import EventIndex from '../Events/EventIndex';
import Sidebar from '../SideBar/SideBar';
import "./ProfilePage.css"

function ProfilePage () {
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
            <Sidebar>
                <div className='user-name'>
                    {user.fname}'s Events
                </div>
                <div className='side-bar-container'>
                    <div className='create-event-link'>
                        <Link to="/event/new" className="new-event-link">Click To Create New Event!</Link>
                    </div>
                    <h2 className='side-bar-title'>Your Upcoming Events!</h2>
                    {Object.values(userEvents).map(event => (
                        <div key={event._id } >
                            <Link to={`/event/${event._id}`} className="event-link">
                                <div className='bigger-container'>
                                    <div className='event-sidebar-container'>
                                        <div className='event-name'>
                                            {event.name}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </Sidebar>
            <EventIndex />
            <br />
        </>
    )
}

export default ProfilePage;