const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    dates: {
        type: [String],
        required: true

    },
    dailyEventStartTime: {
        type: String,
        required: true
    },
    dailyEventEndTime: {
        type: String,
        required: true
    },
    emptySchedule: {
        type: mongoose.SchemaTypes.Mixed
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);