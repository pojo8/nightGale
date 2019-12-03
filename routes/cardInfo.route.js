const express = require('express');
const mongodb = require('mongodb')

// Express route
const cardInfoExpressRoute  = express.Router();

// imported Schemas
let CardInfoSchema = require('../model/cardInfo.model');
let UserSchema = require('../model/user.model');

// update location 
cardInfoExpressRoute.route('/cardInfo/update').post((request, response, next) =>{
    const { body } = request;
    // console.log('body', body);
    let {
      
      userId,
      cardName,
      cardAddress,
      cardNumber,
      cardStartMonth,
      cardStartYear,
      cardExpiryMonth,
      cardExpiryYear,
      cardCVC,
    } = body;

    // verify email doesnt exist
    // FIXME validate email
    UserSchema.find({
        _id: userId
    }, (error, userList) => {
        if (error) {
            return response.send({
                success: false,
                message:'Error: Server error'
            });
        } else if (userList.length < 0 || userList.length == 0 || userList.length >1)  {
            console.log(users)
            return response.send({
                success: false,
                message:'Error: More a than one user found'
            });
        }

    const user = userList[0];

    const newCardInfo = new CardInfoSchema();
    newCardInfo._id = userId;
    newCardInfo.cardName = cardName;
    newCardInfo.cardAddress = cardAddress;
    newCardInfo.cardNumber = cardNumber;
    newCardInfo.cardStartMonth = cardStartMonth;
    newCardInfo.cardStartYear = cardStartYear;
    newCardInfo.cardExpiryMonth = cardExpiryMonth;
    newCardInfo.cardExpiryYear = cardExpiryYear;
    newCardInfo.cardCVC = cardCVC;

    CardInfoSchema.findOneAndUpdate({'_id': userId}, newCardInfo, {upsert:true}, function(error, doc){

        if (error) {
            console.error(error);
            return response.send({
                success: false,
                msg: "Error: work proifile location infor not updated"
            });
        } else {
            response.status(200).json({
                success: true,
                cardInfo: "added successfully"
            })
        }    
    })
 });
});

// Delete user
cardInfoExpressRoute.route('/cardInfo/delete/:id').delete((request , response, next) => {    
    CardInfoSchema.findByIdAndRemove(request.params.id, (error, data) => {
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

// return cardInfo 
cardInfoExpressRoute.route('/get-cardInfo/:userId').get((request, response) => {
    // request.params.{value id the params field} is where valeus are stored
    CardInfoSchema.find({
        _id: request.params.userId
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
                cardInfo: data[0]
            });        
        }
    })
})


module.exports = cardInfoExpressRoute;