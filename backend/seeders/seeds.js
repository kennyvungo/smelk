const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const users = [];

users.push(
    new User ({
        username: 'demo-user',
        fname: 'Demo',
        lname: 'User',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
)

const events = [
    new Event ({
        owner: users[0]._id,
        name: "MERN SharkTank",
        dates: ['2023-06-26', '2023-06-27', '2023-06-28', '2023-06-29','2023-06-30'],
        dailyEventStartTime: "9:00 AM",
        dailyEventEndTime: "6:00 PM"
    }),
    new Event({
        owner: users[0]._id,
        name: "Graduation Shindigs",
        dates: ['2023-07-14', '2023-07-15', '2023-07-16'],
        dailyEventStartTime: "4:00 PM",
        dailyEventEndTime: "10:00 PM"
    })
]