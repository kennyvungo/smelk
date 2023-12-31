const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Event = require('../models/Event');
const Schedule = require("../models/Schedule.js");
const bcrypt = require('bcryptjs');
const { createEmptySchedule } = require('../utils/scheduleHelper');

// const { faker } = require('@faker-js/faker');
// dotenv node seeders/seeds.js

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
        dates: ['2023-11-26', '2023-11-27', '2023-11-28', '2023-11-29','2023-11-30'],
        dailyEventStartTime: "9:00 AM",
        dailyEventEndTime: "6:00 PM",
        emptySchedule: createEmptySchedule(['2023-11-26', '2023-11-27', '2023-11-28', '2023-11-29', '2023-11-30'], "9:00 AM","6:00 PM"),
        responses: [
            {fname: 'Lauren', lname: 'Cary'},
            {fname: 'Demo', lname: 'User'},
            {fname: 'Misha', lname: 'Bansal'}
        ]
    }),
    new Event({
        owner: users[0]._id,
        name: "Graduation Shindigs",
        dates: ['2023-12-14', '2023-12-15', '2023-12-16'],
        dailyEventStartTime: "4:00 PM",
        dailyEventEndTime: "10:00 PM",
        emptySchedule: createEmptySchedule(['2023-12-14', '2023-12-15', '2023-12-16'], "4:00 PM", "10:00 PM"),
        responses: [
            { fname: 'Kenny', lname: 'Ngo' },
            { fname: 'Demo', lname: 'User' },
            { fname: 'Ernest', lname: 'Tan' },
            { fname: 'Shanna', lname: 'Le' }
        ]
    })
]

const schedules = [
    new Schedule ({
        fname: "Lauren",
        lname: "Cary",
        eventId: events[0]._id,
        dailySchedule: {
            '2023-11-26': {
                "9:00 AM": true,
                "9:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": false,
                "1:00 PM": false,
                "1:30 PM": true,
                "2:00 PM": true,
                "2:30 PM": true,
                "3:00 PM": true,
                "3:30 PM": true,
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false
            },
            '2023-11-27': {
                "9:00 AM": true,
                "9:30 AM": true,
                "10:00 AM": true,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": false,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": true,
                "1:30 PM": false,
                "2:00 PM": false,
                "2:30 PM": false,
                "3:00 PM": false,
                "3:30 PM": true,
                "4:00 PM": true,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": false
            }, 
            '2023-11-28': {
                "9:00 AM": false,
                "9:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": false,
                "1:30 PM": false,
                "2:00 PM": false,
                "2:30 PM": false,
                "3:00 PM": false,
                "3:30 PM": false,
                "4:00 PM": false,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": true
            }, 
            '2023-11-29': {
                "9:00 AM": false,
                "9:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": false,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": true,
                "1:30 PM": true,
                "2:00 PM": true,
                "2:30 PM": true,
                "3:00 PM": true,
                "3:30 PM": true,
                "4:00 PM": true,
                "4:30 PM": true,
                "5:00 PM": false,
                "5:30 PM": false
            },
            '2023-11-30': {
                "9:00 AM": true,
                "9:30 AM": true,
                "10:00 AM": true,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": false,
                "1:30 PM": false,
                "2:00 PM": false,
                "2:30 PM": false,
                "3:00 PM": false,
                "3:30 PM": false,
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false
            }
        }
    }),
    new Schedule({
        fname: "Misha",
        lname: "Bansal",
        eventId: events[0]._id,
        dailySchedule: {
            '2023-11-26': {
                "9:00 AM": false,
                "9:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": true,
                "1:30 PM": true,
                "2:00 PM": true,
                "2:30 PM": false,
                "3:00 PM": false,
                "3:30 PM": false,
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false
            },
            '2023-11-27': {
                "9:00 AM": false,
                "9:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": false,
                "1:30 PM": false,
                "2:00 PM": false,
                "2:30 PM": false,
                "3:00 PM": false,
                "3:30 PM": false,
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false
            },
            '2023-11-28': {
                "9:00 AM": false,
                "9:30 AM": false,
                "10:00 AM": true,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": true,
                "1:30 PM": false,
                "2:00 PM": false,
                "2:30 PM": true,
                "3:00 PM": true,
                "3:30 PM": true,
                "4:00 PM": true,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false
            },
            '2023-11-29': {
                "9:00 AM": true,
                "9:30 AM": true,
                "10:00 AM": true,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": false,
                "12:00 PM": false,
                "12:30 PM": true,
                "1:00 PM": true,
                "1:30 PM": true,
                "2:00 PM": true,
                "2:30 PM": true,
                "3:00 PM": true,
                "3:30 PM": true,
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false
            },
            '2023-11-30': {
                "9:00 AM": false,
                "9:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": false,
                "1:00 PM": false,
                "1:30 PM": false,
                "2:00 PM": true,
                "2:30 PM": true,
                "3:00 PM": false,
                "3:30 PM": false,
                "4:00 PM": false,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": true
            }
        }
    }),
    new Schedule({
        fname: "Demo",
        lname: "User",
        eventId: events[0]._id,
        dailySchedule: {
            '2023-11-26': {
                "9:00 AM": true,
                "9:30 AM": true,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": true,
                "1:30 PM": true,
                "2:00 PM": true,
                "2:30 PM": true,
                "3:00 PM": true,
                "3:30 PM": true,
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false
            },
            '2023-11-27': {
                "9:00 AM": true,
                "9:30 AM": true,
                "10:00 AM": true,
                "10:30 AM": false,
                "11:00 AM": false,
                "11:30 AM": false,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": true,
                "1:30 PM": false,
                "2:00 PM": false,
                "2:30 PM": false,
                "3:00 PM": false,
                "3:30 PM": true,
                "4:00 PM": true,
                "4:30 PM": true,
                "5:00 PM": false,
                "5:30 PM": false
            },
            '2023-11-28': {
                "9:00 AM": false,
                "9:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": false,
                "1:30 PM": false,
                "2:00 PM": false,
                "2:30 PM": true,
                "3:00 PM": true,
                "3:30 PM": true,
                "4:00 PM": true,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": true
            },
            '2023-11-29': {
                "9:00 AM": false,
                "9:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": false,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": true,
                "1:30 PM": true,
                "2:00 PM": true,
                "2:30 PM": true,
                "3:00 PM": false,
                "3:30 PM": false,
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false
            },
            '2023-11-30': {
                "9:00 AM": false,
                "9:30 AM": false,
                "10:00 AM": false,
                "10:30 AM": true,
                "11:00 AM": true,
                "11:30 AM": true,
                "12:00 PM": true,
                "12:30 PM": true,
                "1:00 PM": true,
                "1:30 PM": true,
                "2:00 PM": true,
                "2:30 PM": true,
                "3:00 PM": false,
                "3:30 PM": false,
                "4:00 PM": false,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": true
            }
        }
    }),
    new Schedule({
        fname: "Kenny",
        lname: "Ngo",
        eventId: events[1]._id,
        dailySchedule: {
            '2023-12-14': {
                "4:00 PM": true,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": true,
                "6:00 PM": true,
                "6:30 PM": true,
                "7:00 PM": true,
                "7:30 PM": true,
                "8:00 PM": false,
                "8:30 PM": false,
                "9:00 PM": false,
                "9:30 PM": false
            },
            '2023-12-15': {
                "4:00 PM": true,
                "4:30 PM": true,
                "5:00 PM": false,
                "5:30 PM": false,
                "6:00 PM": false,
                "6:30 PM": false,
                "7:00 PM": false,
                "7:30 PM": false,
                "8:00 PM": true,
                "8:30 PM": true,
                "9:00 PM": true,
                "9:30 PM": true
            },
            '2023-12-16': {
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false,
                "6:00 PM": false,
                "6:30 PM": true,
                "7:00 PM": true,
                "7:30 PM": true,
                "8:00 PM": true,
                "8:30 PM": true,
                "9:00 PM": false,
                "9:30 PM": false
            }
        }
    }),
    new Schedule({
        fname: "Demo",
        lname: "User",
        eventId: events[1]._id,
        dailySchedule: {
            '2023-12-14': {
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": true,
                "6:00 PM": true,
                "6:30 PM": true,
                "7:00 PM": true,
                "7:30 PM": true,
                "8:00 PM": true,
                "8:30 PM": true,
                "9:00 PM": false,
                "9:30 PM": false
            },
            '2023-12-15': {
                "4:00 PM": true,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": true,
                "6:00 PM": true,
                "6:30 PM": true,
                "7:00 PM": false,
                "7:30 PM": false,
                "8:00 PM": false,
                "8:30 PM": true,
                "9:00 PM": true,
                "9:30 PM": true
            },
            '2023-12-16': {
                "4:00 PM": false,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": true,
                "6:00 PM": false,
                "6:30 PM": false,
                "7:00 PM": false,
                "7:30 PM": true,
                "8:00 PM": true,
                "8:30 PM": true,
                "9:00 PM": false,
                "9:30 PM": true
            }
        }
    }),
    new Schedule({
        fname: "Ernest",
        lname: "Tan",
        eventId: events[1]._id,
        dailySchedule: {
            '2023-12-14': {
                "4:00 PM": false,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": true,
                "6:00 PM": true,
                "6:30 PM": true,
                "7:00 PM": true,
                "7:30 PM": true,
                "8:00 PM": true,
                "8:30 PM": true,
                "9:00 PM": true,
                "9:30 PM": true
            },
            '2023-12-15': {
                "4:00 PM": true,
                "4:30 PM": true,
                "5:00 PM": false,
                "5:30 PM": false,
                "6:00 PM": false,
                "6:30 PM": false,
                "7:00 PM": true,
                "7:30 PM": true,
                "8:00 PM": true,
                "8:30 PM": true,
                "9:00 PM": true,
                "9:30 PM": true
            },
            '2023-12-16': {
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false,
                "6:00 PM": true,
                "6:30 PM": true,
                "7:00 PM": true,
                "7:30 PM": true,
                "8:00 PM": true,
                "8:30 PM": true,
                "9:00 PM": true,
                "9:30 PM": true
            }
        }
    }),
    new Schedule({
        fname: "Shanna",
        lname: "Le",
        eventId: events[1]._id,
        dailySchedule: {
            '2023-12-14': {
                "4:00 PM": false,
                "4:30 PM": true,
                "5:00 PM": true,
                "5:30 PM": true,
                "6:00 PM": true,
                "6:30 PM": true,
                "7:00 PM": true,
                "7:30 PM": true,
                "8:00 PM": false,
                "8:30 PM": false,
                "9:00 PM": false,
                "9:30 PM": false
            },
            '2023-12-15': {
                "4:00 PM": true,
                "4:30 PM": true,
                "5:00 PM": false,
                "5:30 PM": false,
                "6:00 PM": true,
                "6:30 PM": true,
                "7:00 PM": true,
                "7:30 PM": true,
                "8:00 PM": false,
                "8:30 PM": false,
                "9:00 PM": false,
                "9:30 PM": false
            },
            '2023-12-16': {
                "4:00 PM": false,
                "4:30 PM": false,
                "5:00 PM": false,
                "5:30 PM": false,
                "6:00 PM": true,
                "6:30 PM": true,
                "7:00 PM": true,
                "7:30 PM": true,
                "8:00 PM": true,
                "8:30 PM": false,
                "9:00 PM": false,
                "9:30 PM": false
            }
        }
    }),
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
    console.log("Resetting db and seeding users, events and schedules...")

    User.collection.drop()
        .then(() => Event.collection.drop())
        .then(() => Schedule.collection.drop())
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
