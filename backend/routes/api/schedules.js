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

router.get('/agg',async(req,res,next) => {
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