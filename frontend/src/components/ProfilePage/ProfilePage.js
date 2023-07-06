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
                <Link to="/event/new" className="new-event-link">Create New Event!</Link>
                <h2 className='side-bar-title'>Your upcoming Events!</h2>
                {Object.values(userEvents).map(event => (
                    <div key={event._id } className='new-event-link'>
                        <Link to={`/event/${event._id}`}className='new-event-link'>
                            {event.name}
                        </Link>
                    </div>
                ))}
            </Sidebar>
            <EventIndex />
            <br />
        </>
    )
}

export default ProfilePage;