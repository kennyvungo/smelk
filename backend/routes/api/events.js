const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = mongoose.model('User');
const Event = mongoose.model('Event');
const { requireUser } = require('../../config/passport');

router.post('/', async (req, res, next) => {
    try {
        const newEvent = new Event({
            // owner: req.user._id,
            name: req.body.name,
            dates: req.body.dates,
            dailyEventStartTime: req.body.startTime,
            dailyEventEndTime: req.body.endTime
        });

        let event = await newEvent.save();
        // event = await Event.populate('owner', '_id username');
        return res.json(event);
    }
    catch(err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
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
        const updatedEvent = req.body;
        const id = req.params.id;
        let event = await newEvent.save();
        event = await Event.updateOne({_id: isObjectIdOrHexString(id)},{$set: updatedEvent});
        return res.json(event);
    }
    catch (err) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = { message: "No event found with that id" };
        return next(error);
    }
})

module.exports = router;