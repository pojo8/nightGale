const express = require('express');
const mongodb = require('mongodb')

// Express route
const calendarEventExpressRoute  = express.Router();

// imported Schemas
let CalendarEventSchema = require('../model/calendarEvent.model');
let UserSchema = require('../model/user.model');

// update location 
calendarEventExpressRoute.route('/calendarEvent/update').post((request, response, next) =>{
    const { body } = request;
    // console.log('body', body);
    let {
      eventId,
      start,
      end,
      eventDuration,
      shiftEarnings,
      hourlyRate,
      title,
      synced,
      booked,
      createdById,
      swapPending,
      open,
      field,
    } = body;

    // verify email doesnt exist
    // FIXME validate email
    // UserSchema.find({
    //     _id: userId
    // }, (error, userList) => {
    //     if (error) {
    //         return response.send({
    //             success: false,
    //             message:'Error: Server error'
    //         });
    //     } else if (userList.length < 0 || userList.length == 0 || userList.length >1)  {
    //         console.log(users)
    //         return response.send({
    //             success: false,
    //             message:'Error: More a than one user found'
    //         });
    //     }

    // const user = userList[0];

    const newCalendarEvent = new CalendarEventSchema();
    // newCardInfo._id = userId;
    newCalendarEvent._id = eventId;
    newCalendarEvent.start = start;
    newCalendarEvent.end = end;
    newCalendarEvent.hourlyRate = hourlyRate;
    newCalendarEvent.eventDuration = eventDuration;
    newCalendarEvent.shiftEarnings = shiftEarnings;
    newCalendarEvent.title = title;
    newCalendarEvent.booked = booked;
    newCalendarEvent.synced = synced;
    newCalendarEvent.createdById = createdById;
    newCalendarEvent.swapPending = swapPending;
    newCalendarEvent.open = open;
    newCalendarEvent.field = field;

    // CalendarEventSchema.findOneAndUpdate({'_id': eventId}, newCalendarEvent, function(error, doc){

    CalendarEventSchema.findOneAndUpdate({'_id': eventId}, newCalendarEvent, {upsert:true}, function(error, doc){

        if (error) {
            console.error(error);
            return response.send({
                success: false,
                msg: "Error: work proifile location infor not updated"
            });
        } else {
            response.status(200).json({
                success: true,
                calendarEvent: doc
            })
        }    
    })
});

// Delete user
calendarEventExpressRoute.route('/calendarEvent/delete/:eventId').delete((request , response, next) => {    
    CalendarEventSchema.findByIdAndRemove(request.params.eventId, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // In the event of an ok response output the message
            response.status(200).json({
                deletedCardInfo: data
            })
        }
    })
})

// return calendarEvent 
calendarEventExpressRoute.route('/get-calendarEvent/:eventId').get((request, response) => {
    // request.params.{value id the params field} is where valeus are stored
    CalendarEventSchema.find({
        _id: request.params.eventId
    }, (error, data) => {
        if (error) {
            return response.send({
                success: false,
                messaged: 'Error: Server error'
            });
        } else if(data.length == 0){
            return response.send({
                success: false,
                messaged: 'Record not found'
            });
        }else {
            // In the event of an ok response output the message
            return response.send({
                success: true,
                // This is to get only first result form array of results
                calendarEvent: data[0]
            });        
        }
    })
})

// return calendarEvent 
calendarEventExpressRoute.route('/AM-calendarEvents').get((request, response) => {
    // request.params.{value id the params field} is where valeus are stored
    CalendarEventSchema.find({
        field: 'AM'
    }, (error, data) => {
        if (error) {
            return response.send({
                success: false,
                messaged: 'Error: Server error'
            });
        } else if(data.length == 0){
            return response.send({
                success: false,
                messaged: 'Record not found'
            });
        }else {
            // In the event of an ok response output the message
            return response.send({
                success: true,
                // This is to get only first result form array of results
                calendarEvent: data
            });        
        }
    })
})


module.exports = calendarEventExpressRoute;