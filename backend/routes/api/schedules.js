const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');
const Event = mongoose.model('Event');

router.post('/', async (req, res, next) => {
    try {
        const newSchedule = new Schedule({
            fname: req.body.fname,
            lname: req.body.lname,
            eventId: req.body.eventId,
            dailySchedule: req.body.dailySchedule
        });
        const update = await Event.updateOne({ _id: req.body.eventId }, { $push: { responses: { fname: req.body.fname, lname: req.body.lname}}})
        const schedule = await newSchedule.save();
        const event = await Event.findById({ _id: req.body.eventId });

        return res.json({event, schedule});
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

router.get('/event/:eventId/name/:name', async (req, res) => {
  const schedule = await Schedule.find({ fname: req.params.name.split("&")[0], lname: req.params.name.split("&")[1], eventId: req.params.eventId })
  console.log(schedule[0]);
  return res.json(schedule[0])
})

router.get('/agg/:id',async(req,res,next) => {
    try{
        const agg = await Schedule.aggregate([
            {
              '$addFields': {
                'dateArray': {
                  '$objectToArray': '$dailySchedule'
                }
              }
            }, {
              '$unwind': {
                'path': '$dateArray'
              }
            }, {
              '$addFields': {
                'timeArray': {
                  '$objectToArray': '$dateArray.v'
                }
              }
            }, {
              '$unwind': {
                'path': '$timeArray'
              }
            }, {
              '$group': {
                '_id': {
                  'event': '$eventId', 
                  'date': '$dateArray.k', 
                  'time': '$timeArray.k'
                }, 
                'available': {
                  '$push': {
                    '$cond': [
                      {
                        '$eq': [
                          '$timeArray.v', true
                        ]
                      }, '$fname', null
                    ]
                  }
                }, 
                'unavailable': {
                  '$push': {
                    '$cond': [
                      {
                        '$eq': [
                          '$timeArray.v', false
                        ]
                      }, '$fname', null
                    ]
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'event': '$_id.event', 
                  'date': '$_id.date'
                }, 
                'count': {
                  '$sum': 1
                }, 
                'times': {
                  '$push': {
                    'k': '$_id.time', 
                    'v': {
                      'available': '$available', 
                      'unavailable': '$unavailable'
                    }
                  }
                }
              }
            }, {
              '$project': {
                'times': {
                  '$arrayToObject': '$times'
                }
              }
            }, {
              '$group': {
                '_id': '$_id.event', 
                'dates': {
                  '$push': {
                    'k': '$_id.date', 
                    'v': '$times'
                  }
                }
              }
            }, {
              '$project': {
                'dates': {
                  '$arrayToObject': '$dates'
                }
              }
            }
          ])
          return res.json(agg)
    }
    catch(err){
        const error = new Error('Schedule not found');
        error.statusCode=404;
        error.errors = {message: "no schedule found with that id"};
        return next(error);
    }

    
})

module.exports = router;

// hi