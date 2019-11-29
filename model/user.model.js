const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    accountType: {
        type: String,
        default: ''
    },
    hourlyRate: {
        type: Number
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpiry: {
        type: Number,
    },
    forcePasswordReset: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    
},
    {
        collection: 'users'
    })


// Creating hashed password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// validates password against hashed password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// validates password against hashed password
userSchema.methods.generateRandPassword = function(randomString) {
    return bcrypt.hashSync(randomString, bcrypt.genSaltSync(8), null);
}

module.exports = mongoose.model('UserSchema', userSchema);