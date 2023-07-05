const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const Schedule = mongoose.model('Schedule');
const scheduleHelper = require('../../utils/scheduleHelper');
// const { requireUser } = require('../../config/passport');

router.post('/', async (req, res, next) => {
    try {
        const newEvent = new Event({
            owner: req.body.owner,
            name: req.body.name,
            dates: req.body.dates,
            dailyEventStartTime: req.body.dailyEventStartTime,
            dailyEventEndTime: req.body.dailyEventEndTime,
            emptySchedule: scheduleHelper.createEmptySchedule(req.body.dates, req.body.dailyEventStartTime, req.body.dailyEventEndTime)
        });

        let event = await newEvent.save();
        let user = await User.updateOne({_id: req.body.owner}, {$push: {ownedEvents: event._id}})
        user = await User.findById(event.owner)
        return res.json({ user, event });
    }
    catch(err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        console.log(req.params.id)
        const event = await Event.findById(req.params.id)
        return res.json(event);
    }
    catch(err) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = {message: "No event found with that id"};
        return next(error);
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        let updatedEventDetails = req.body;
        const id = req.params.id;
        const originalEvent = await Event.findById(id)
        // if start or end times change, update schedules

        if (req.body.dailyEventStartTime || req.body.dailyEventEndTime) {
            // console.log("test");
            const startTime = req.body.dailyEventStartTime ? req.body.dailyEventStartTime : originalEvent.dailyEventStartTime;
            const endTime = req.body.dailyEventEndTime ? req.body.dailyEventEndTime : originalEvent.dailyEventEndTime;
            const dates = req.body.dates ? req.body.dates : originalEvent.dates;

            updatedEventDetails.emptySchedule = scheduleHelper.createEmptySchedule(dates, startTime, endTime);
        }
        
        
        const update = await Event.updateOne({_id: id},{$set: updatedEventDetails});
        const updatedEvent = await Event.findById(id)
        return res.json(updatedEvent);
    }
    catch (err) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = { message: "No event found with that id" };
        return next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const event = await Event.findOneAndDelete({_id: req.params.id})
        console.log(event.owner);
        let user = await User.updateOne({ _id: event.owner }, { $pull: { ownedEvents: event._id }})
        user = await User.findById(event.owner)
        return res.json(user)
    }
    catch (err) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = { message: "No event found with that id" };
        return next(error);
    }
})

router.get('/', async (req, res) => {
    const events = await Event.find()
    return res.json(events)
})

module.exports = router;