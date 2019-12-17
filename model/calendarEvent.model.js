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
    swapRequestBy: {
        type: String,
    },
    approvedBy:{
        type: String
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
    userBooked: {
        type: String,
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
    // for adding a selection point from list
    location:{
        type: {
            type: String,
            enum: ['Point'],
            required: false //true
        },
        coordinates: {
            type: [Number],
            required: false // true
        }
    }
}
    ,
    {
        collection: 'calendarEvents'
})

module.exports = mongoose.model('CalendarEventSchema', calendarEventSchema);