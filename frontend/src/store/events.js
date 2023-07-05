import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_EVENTS = "events/RECEIVE_EVENTS";
const RECEIVE_EVENT = "events/RECEIVE_EVENT";
const RECEIVE_USER_EVENTS = "events/RECEIVE_USER_EVENTS";
const RECEIVE_NEW_EVENT = "events/RECEIVE_NEW_EVENT";
const RECEIVE_EVENT_ERRORS = "events/RECEIVE_EVENT_ERRORS";
const CLEAR_EVENT_ERRORS = "events/CLEAR_EVENT_ERRORS";

const receiveEvents = events => ({
    type: RECEIVE_EVENTS,
    events
});

const receiveEvent = event => ({
    type: RECEIVE_EVENT,
    event
});

const receiveUserEvents = events => ({
    type: RECEIVE_USER_EVENTS,
    events
});

const receiveNewEvent = event => ({
    type: RECEIVE_NEW_EVENT,
    event
});

const receiveErrors = errors => ({
    type: RECEIVE_EVENT_ERRORS,
    errors
});

export const clearEventErrors = errors => ({
    type: CLEAR_EVENT_ERRORS,
    errors
});

export const fetchEvent = id => async dispatch => {
    try {
        const res = await jwtFetch(`/api/events/${id}`);
        const event = await res.json();
        dispatch(receiveEvent(event));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchEvents = () => async dispatch => {
    try {
        const res = await jwtFetch ('/api/events');
        const events = await res.json();
        dispatch(receiveEvents(events));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchUserEvents = id => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/${id}`);
        const data = await res.json();
        dispatch(receiveUserEvents(data.events));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const createEvent = data => async dispatch => {
    try {
        const res = await jwtFetch('/api/events/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const event = await res.json();
        dispatch(receiveNewEvent(event));
        return event;
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

const nullErrors = null;

export const eventErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_EVENT_ERRORS:
            return action.errors;
        case RECEIVE_NEW_EVENT:
        case CLEAR_EVENT_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const eventsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    switch(action.type) {
        case RECEIVE_EVENTS:
            return { ...state, all: action.events, new: undefined};
        case RECEIVE_USER_EVENTS:
            return { ...state, user: action.events, new: undefined};
        case RECEIVE_NEW_EVENT:
            return { ...state, new: action.event};
        case RECEIVE_EVENT:
            return { ...state, current: action.event };
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {}, new: undefined }
        default:
            return state;
    }
};

export default eventsReducer;
