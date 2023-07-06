const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');

router.post('/', async (req, res, next) => {
    try {
        const newSchedule = new Schedule({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            eventId: req.body.eventId,
            dailySchedule: req.body.dailySchedule
        });

        const schedule = await newSchedule.save();
        return res.json(schedule);
    }
    catch (err) {
        next(err);
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        let updateScheduleDetails = req.body;
        const id = req.params.id;
        const update = await Schedule.updateOne({ _id: id }, { $set: updateScheduleDetails })
        const updatedSchedule = await Schedule.findById({ _id: id });
        return res.json(updatedSchedule);
    } 
    catch (err) {
        const error = new Error('Schedule not found');
        error.statusCode = 404;
        error.errors = { message: "No schedule found with that id" };
        return next(error);
    }
})

router.get('/', async (req, res) => {
    const schedules = await Schedule.find()
    return res.json(schedules)
})

module.exports = router;