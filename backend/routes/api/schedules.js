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

        })
    }
    catch (err) {

    }
})

router.get('/', async (req, res) => {
    const schedules = await Schedule.find()
    return res.json(schedules)
})

module.exports = router;