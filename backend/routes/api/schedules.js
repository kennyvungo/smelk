const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');

router.post('/', async (req, res, next) => {

})

router.get('/', async (req, res) => {
    const schedules = await Schedule.find()
    return res.json(schedules)
})

module.exports = router;