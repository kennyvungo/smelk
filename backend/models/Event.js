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
        type: [Date]
        },
    dailyEventStartTime: {
        type: Date
    },
    dailyEventEndTime: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);