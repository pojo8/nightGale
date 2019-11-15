const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workProfileSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    dob: {
        type: Date,
    },
    workHistory: {
        type: String,
    },
    cvImage: {
        type: String,
    },
    dbsNumber: {
        type: Number,
    },
     dbsImage: {
        type: Buffer,
    },
    specialtyFields: [{
        type: String,
    }],
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    postCode: {
        type: String,
    },
    country: {
        type: String,
    },
    travelDistance: {
        type: Number,
    },
    gmcNumber: {
        type: String,
    },
    gmcImage: {
        type: Buffer,
    },
    f1CertImage: {
        type: Buffer,
    },
    medicalCertImage: {
        type: Buffer,
    },
    vaccinationHistImage: [{
        type: Buffer,
    }],

}
    ,
    {
        collection: 'workProfile'
})

module.exports = mongoose.model('WorkProfileSchema', workProfileSchema);