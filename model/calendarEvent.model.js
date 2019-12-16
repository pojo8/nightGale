const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarEventSchema = new Schema({
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    eventDuration: {
        type: Number,
    },
    synced: {
        type: Boolean,
        deafault: false,
    },
    shiftEarnings: {
        type: Number,
    },
    hourlyRate: {
        type: Number,
    },
    title: {
        type: String,
    },
    booked: {
        type: Boolean,
    },
    createdById: {
        type: String,
    },
    swapPending: {
        type: Boolean,
    },
    open: {
        type: Boolean,
    },
     field: {
        type: String,
    },
}
    ,
    {
        collection: 'calendarEvents'
})

module.exports = mongoose.model('CalendarEventSchema', calendarEventSchema);