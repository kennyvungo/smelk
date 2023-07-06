const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const dailyScheduleSchema = new Schema({
    
// })


const scheduleSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    dailySchedule: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    },
    owner: {
        type: String,
        ref: 'User'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Schedule', scheduleSchema)