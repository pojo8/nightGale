const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardInfoSchema = new Schema({
    cardName:{
        type: String
    },
    cardAddress:{
        type: String
    } ,
    cardNumber:{
        type: String
    },
    cardStartMonth:{
        type: Number
    },
    cardStartYear:{
        type: Number
    },
    cardExpiryMonth:{
        type: Number
    },
    cardExpiryYear:{
        type: Number
    },
    cardCVC:{
        type: Number
    }
}, {
        collection: 'cardInfo'
    })

module.exports = mongoose.model('CardInfoSchema', cardInfoSchema)