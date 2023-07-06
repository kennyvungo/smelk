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
                      }, '$firstName', null
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
                      }, '$firstName', null
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