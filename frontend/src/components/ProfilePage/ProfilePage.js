import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserEvents } from '../../store/events';
import { Link } from "react-router-dom";

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
            <Link to="/event/new">Create New Event!</Link>
            <h2>Your upcoming Events!</h2>
            {Object.values(userEvents).map(event => (
                <div key={event._id}>
                    <Link to={`/event/${event._id}`}>
                        {event.name}
                    </Link>
                </div>
            ))}
        </>
    )
}

export default ProfilePage;