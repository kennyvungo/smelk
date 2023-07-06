import jwtFetch from "./jwt";
import { receiveEvent } from "./events";

const RECEIVE_SCHEDULES = "schedules/RECEIVE_SCHEDULES";
const RECEIVE_SCHEDULE = "schedules/RECEIVE_SCHEDULE";
const RECEIVE_USER_SCHEDULES = "schedules/RECEIVE_USER_SCHEDULE";
const RECEIVE_NEW_SCHEDULE = "schedules/RECEIVE_NEW_SCHEDULE";
const RECEIVE_SCHEDULE_ERRORS = "events/RECEIVE_EVENT_ERRORS";
const CLEAR_EVENT_ERRORS = "events/CLEAR_EVENT_ERRORS";


const receiveSchedules = schedules => ({
    type: RECEIVE_SCHEDULES,
    schedules
});

const receiveSchedule = schedule => ({
    type: RECEIVE_SCHEDULE,
    schedule
});

const receiveUserSchedules = schedules => ({
    type: RECEIVE_USER_SCHEDULES,
    schedules
});

const receiveNewSchedule = SCHEDULE => ({
    type: RECEIVE_NEW_SCHEDULE,
    SCHEDULE
});

const receiveErrors = errors => ({
    type: RECEIVE_SCHEDULE_ERRORS,
    errors
});



export const fetchAggSchedule = id => async dispatch => {
    try {
        const res = await jwtFetch(`/api/schedules/agg/${id}`);
        const aggSchedule = await res.json();
        dispatch(receiveSchedules(aggSchedule));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};


export const createSchedule = data => async dispatch => {
    try {
        const res = await jwtFetch('/api/schedules/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        dispatch(receiveNewSchedule(resData.schedule));
        dispatch(receiveEvent(resData.event));
        return resData.schedule;
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

const nullErrors = null;

export const scheduleErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_SCHEDULE_ERRORS:
            return action.errors;
        case RECEIVE_NEW_SCHEDULE:
        case CLEAR_EVENT_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const schedulesReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    switch(action.type) {
        case RECEIVE_SCHEDULES:
            return { ...state, all: action.schedules, new: undefined};
        case RECEIVE_USER_SCHEDULES:
            return { ...state, user: action.events, new: undefined};
        case RECEIVE_NEW_SCHEDULE:
            return { ...state, new: action.event};
        case RECEIVE_SCHEDULE:
            return { ...state, current: action.event };
        default:
            return state;
    }
};

export default schedulesReducer;
