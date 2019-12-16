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
        type: String,
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
        type: String,
    },
    specialtyFields: [{
        type: Object,
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
        type: String,
    },
    f1CertImage: {
        type: String,
    },
    medicalCertImage: {
        type: String,
    },
    references: {
        type: String,
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