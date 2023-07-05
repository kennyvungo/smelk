const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    username: {
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