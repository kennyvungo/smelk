const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Event = require('../models/Event');
const Schedule = require("../models/Schedule.js");
const bcrypt = require('bcryptjs');
// const { faker } = require('@faker-js/faker');

const users = [];

users.push(
    new User ({
        username: 'demo-user',
        fname: 'Demo',
        lname: 'User',
        hashedPassword: bcrypt.hashSync('password', 10),
        ownedEvents: []
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

const schedules = [
    new Schedule ({
        firstName: "Lauren",
        lastName: "Cary",
        eventId: events[0]._id,
        dailySchedule: {
            '2023-06-26': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": false,
                "01:00 PM": false,
                "01:30 PM": true,
                "02:00 PM": true,
                "02:30 PM": true,
                "03:00 PM": true,
                "03:30 PM": true,
                "04:00 PM": false,
                "04:30 PM": false,
                "05:00 PM": false,
                "05:30 PM": false
            },
            '2023-06-27': {
                "09:00 AM": true,
                "09:30 AM": true,
                "10:00 AM": true,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": false,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": true,
                "01:30 PM": false,
                "02:00 PM": false,
                "02:30 PM": false,
                "03:00 PM": false,
                "03:30 PM": true,
                "04:00 PM": true,
                "04:30 PM": true,
                "05:00 PM": true,
                "05:30 PM": false
            }, 
            '2023-06-28': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": false,
                "01:30 PM": false,
                "02:00 PM": false,
                "02:30 PM": false,
                "03:00 PM": false,
                "03:30 PM": false,
                "04:00 PM": false,
                "04:30 PM": true,
                "05:00 PM": true,
                "05:30 PM": true
            }, 
            '2023-06-29': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": false,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": true,
                "01:30 PM": true,
                "02:00 PM": true,
                "02:30 PM": true,
                "03:00 PM": true,
                "03:30 PM": true,
                "04:00 PM": true,
                "04:30 PM": true,
                "05:00 PM": false,
                "05:30 PM": false
            },
            '2023-06-30': {
                "09:00 AM": true,
                "09:30 AM": true,
                "10:00 AM": true,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": false,
                "01:30 PM": false,
                "02:00 PM": false,
                "02:30 PM": false,
                "03:00 PM": false,
                "03:30 PM": false,
                "04:00 PM": false,
                "04:30 PM": false,
                "05:00 PM": false,
                "05:30 PM": false
            }
        }
    }),
    new Schedule({
        firstName: "Misha",
        lastName: "Bansal",
        eventId: events[0]._id,
        dailySchedule: {
            '2023-06-26': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": true,
                "01:30 PM": true,
                "02:00 PM": true,
                "02:30 PM": false,
                "03:00 PM": false,
                "03:30 PM": false,
                "04:00 PM": false,
                "04:30 PM": false,
                "05:00 PM": false,
                "05:30 PM": false
            },
            '2023-06-27': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": false,
                "01:30 PM": false,
                "02:00 PM": false,
                "02:30 PM": false,
                "03:00 PM": false,
                "03:30 PM": false,
                "04:00 PM": false,
                "04:30 PM": false,
                "05:00 PM": false,
                "05:30 PM": false
            },
            '2023-06-28': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": true,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": true,
                "01:30 PM": false,
                "02:00 PM": false,
                "02:30 PM": true,
                "03:00 PM": true,
                "03:30 PM": true,
                "04:00 PM": true,
                "04:30 PM": false,
                "05:00 PM": false,
                "05:30 PM": false
            },
            '2023-06-29': {
                "09:00 AM": true,
                "09:30 AM": true,
                "10:00 AM": true,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": false,
                "12:00 PM": false,
                "12:30 PM": true,
                "01:00 PM": true,
                "01:30 PM": true,
                "02:00 PM": true,
                "02:30 PM": true,
                "03:00 PM": true,
                "03:30 PM": true,
                "04:00 PM": false,
                "04:30 PM": false,
                "05:00 PM": false,
                "05:30 PM": false
            },
            '2023-06-30': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": false,
                "01:00 PM": false,
                "01:30 PM": false,
                "02:00 PM": true,
                "02:30 PM": true,
                "03:00 PM": false,
                "03:30 PM": false,
                "04:00 PM": false,
                "04:30 PM": true,
                "05:00 PM": true,
                "05:30 PM": true
            }
        }
    }),
    new Schedule({
        firstName: "Demo",
        lastName: "User",
        eventId: events[0]._id,
        dailySchedule: {
            '2023-06-26': {
                "09:00 AM": true,
                "09:30 AM": true,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": true,
                "01:30 PM": true,
                "02:00 PM": true,
                "02:30 PM": true,
                "03:00 PM": true,
                "03:30 PM": true,
                "04:00 PM": false,
                "04:30 PM": false,
                "05:00 PM": false,
                "05:30 PM": false
            },
            '2023-06-27': {
                "09:00 AM": true,
                "09:30 AM": true,
                "10:00 AM": true,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": false,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": true,
                "01:30 PM": false,
                "02:00 PM": false,
                "02:30 PM": false,
                "03:00 PM": false,
                "03:30 PM": true,
                "04:00 PM": true,
                "04:30 PM": true,
                "05:00 PM": false,
                "05:30 PM": false
            },
            '2023-06-28': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": false,
                "01:30 PM": false,
                "02:00 PM": false,
                "02:30 PM": true,
                "03:00 PM": true,
                "03:30 PM": true,
                "04:00 PM": true,
                "04:30 PM": true,
                "05:00 PM": true,
                "05:30 PM": true
            },
            '2023-06-29': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": true,
                "01:30 PM": true,
                "02:00 PM": true,
                "02:30 PM": true,
                "03:00 PM": false,
                "03:30 PM": false,
                "04:00 PM": false,
                "04:30 PM": false,
                "05:00 PM": false,
                "05:30 PM": false
            },
            '2023-06-30': {
                "09:00 AM": false,
                "09:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "01:00 PM": true,
                "01:30 PM": true,
                "02:00 PM": true,
                "02:30 PM": true,
                "03:00 PM": false,
                "03:30 PM": false,
                "04:00 PM": false,
                "04:30 PM": true,
                "05:00 PM": true,
                "05:30 PM": true
            }
        }
    })
]


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

const insertSeeds = () => {
    console.log("Resetting db and seeding users and tweets...")

    User.collection.drop()
        .then(() => Event.collection.drop())
        .then(() => User.insertMany(users))
        .then(() => Event.insertMany(events))
        .then(() => Schedule.insertMany(schedules))
        .then(() => User.updateOne({_id: users[0]._id}, {ownedEvents: [events[0]._id, events[1]._id]}))
        .then(() => {
            console.log("Done!");
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
}
