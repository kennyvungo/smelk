const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const Schedule = mongoose.model('Schedule');
const {createEmptySchedule, updateDailySchedule} = require('../../utils/scheduleHelper');
// const { requireUser } = require('../../config/passport');

const generateEvents = require('../../generate.js');

router.post("/generate", async (req, res) => {
    const people = req.body.people
    const setting = req.body.setting
    const energy = req.body.energy
    try {
        const events = await generateEvents(people, setting, energy);
        res.json({ response: events })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})


router.post('/', async (req, res, next) => {
    try {
        const newEvent = new Event({
            owner: req.body.owner,
            name: req.body.name,
            dates: req.body.dates,
            dailyEventStartTime: req.body.dailyEventStartTime,
            dailyEventEndTime: req.body.dailyEventEndTime,
            emptySchedule: createEmptySchedule(req.body.dates, req.body.dailyEventStartTime, req.body.dailyEventEndTime),
            responses: []
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

        if (req.body.dailyEventStartTime || req.body.dailyEventEndTime || req.body.dates) {
            // console.log("test");
            const startTime = req.body.dailyEventStartTime === undefined ? originalEvent.dailyEventStartTime :  req.body.dailyEventStartTime;
            const endTime = req.body.dailyEventEndTime === undefined ? originalEvent.dailyEventEndTime :  req.body.dailyEventEndTime;
            const dates = req.body.dates === undefined ? originalEvent.dates :  req.body.dates;

            updatedEventDetails.emptySchedule = createEmptySchedule(dates, startTime, endTime);

            const schedules = await Schedule.find({ eventId: id })
            for (const schedule of schedules) {
                const updatedSchedule = updateDailySchedule(schedule.dailySchedule, dates, startTime, endTime)
                // return res.json({schedule, updatedSchedule});
                const updates = await Schedule.updateOne({ _id: schedule._id }, { $set: { dailySchedule: updatedSchedule }})
            }
        }
        
        
        const update = await Event.updateOne({_id: id},{$set: updatedEventDetails});
        const updatedEvent = await Event.findById(id)
        return res.json(updatedEvent);
        // return res.send('end of update message')
    }
    catch (err) {
        console.log(err);
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = { message: "No event found with that id" };
        return next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const event = await Event.findOneAndDelete({_id: req.params.id})
        // console.log(event.owner);
        const schedules = await Schedule.deleteMany({ eventId: req.params.id })
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