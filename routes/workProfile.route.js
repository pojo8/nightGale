const express = require('express');
const fileUpload = require('express-fileupload');
const mongodb = require('mongodb')
const fs = require('fs');

const binary = mongodb.Binary

const app = express();

// Express route
const workProfileExpressRoute  = express.Router();

// imported Schemas
let WorkProfileSchema = require('../model/workProfile.model');
let UserSchema = require('../model/user.model');

// update location 
workProfileExpressRoute.route('/workProfile/location-update').post((request, response, next) =>{
    const { body } = request;
    // console.log('body', body);
    let {
        userId,
        address,
        city,
        postCode,
        country,
        travelDistance,
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
        } else if (userList.length < 0 || userList.length >1)  {
            console.log(users)
            return response.send({
                success: false,
                message:'Error: More a than one user found'
            });
        }

    const user = userList[0];

    const newLocationInfo = new WorkProfileSchema();
    newLocationInfo._id = userId;
    newLocationInfo.userId = userId;
    newLocationInfo.address = address;
    newLocationInfo.city = city;
    newLocationInfo.postCode = postCode;
    newLocationInfo.country = country;
    newLocationInfo.travelDistance = travelDistance;
    
    WorkProfileSchema.findOneAndUpdate({'_id': userId}, newLocationInfo, {upsert:true}, function(error, doc){

        if (error) {
            console.error(error);
            return response.send({
                success: false,
                msg: "Error: work proifile location infor not updated"
            });
        } else {
            console.log(newLocationInfo);
            response.status(200).json({
                success: true,
                locationInfo: newLocationInfo
            })
        }    
    })
 });
});

// update profession tab
workProfileExpressRoute.route('/workProfile/profession-update').post((request, response, next) =>{
    const { body } = request;
    // console.log('body', body);
    let {
        userId,
        firstName,
        lastName,
        email,
        dob,
        workHistory,
        cvImage,
        dbsNumber,
        dbsImage,
        specialtyFields,

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
        } else if (userList.length < 0 || userList.length >1)  {
            console.log(users)
            return response.send({
                success: false,
                message:'Error: More a than one user found'
            });
        }

    const user = userList[0];

    const newProfessionInfo = new WorkProfileSchema();
    newProfessionInfo._id = userId;
    newProfessionInfo.firstName = firstName;
    newProfessionInfo.lastName = lastName;
    newProfessionInfo.email = email;
    newProfessionInfo.dob = dob;
    newProfessionInfo.workHistory = workHistory;
    newProfessionInfo.dbsNumber = dbsNumber;
    newProfessionInfo.specialtyFields = specialtyFields;

    // processing for the image files
    newProfessionInfo.cvImage = cvImage;
    newProfessionInfo.dbsImage =  dbsImage;

    let binaryCvImage =  new Buffer(binary(cvImage));
   // newProfessionInfo.cvImage = binaryCvImage;

    WorkProfileSchema.findOneAndUpdate({'_id': userId}, newProfessionInfo, {upsert:true}, function(error, doc){

        if (error) {
            console.error(error);
            return response.send({
                success: false,
                msg: "Error: work proifile location infor not updated"
            });
        } else {
            console.log(newProfessionInfo);
            response.status(200).json({
                success: true,
                professionionInfo: newProfessionInfo
            })
        }    
    })
 });
});

workProfileExpressRoute.route('/workProfile/profession-upload-cv').post((request, response, next) =>{
    const { body } = request;
    // console.log('body', body);

    // let file = {name: request.body.userId + 'cv', file: binary(request.files.cvImage.data)}

    let {
        userId,
        cvImage,
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
        } else if (userList.length < 0 || userList.length >1)  {
            console.log(users)
            return response.send({
                success: false,
                message:'Error: More a than one user found'
            });
        }

    const user = userList[0];

    const newProfessionInfo = new WorkProfileSchema();
    newProfessionInfo._id = userId;
    // processing for the image files
   // newProfessionInfo.cvImage = cvImage;

    let binaryCvImage =  new Buffer(binary(cvImage).toString('base64'));
    newProfessionInfo.cvImage = binaryCvImage;

    WorkProfileSchema.findOneAndUpdate({'_id': userId}, newProfessionInfo, {upsert:true}, function(error, doc){

        if (error) {
            console.error(error);
            return response.send({
                success: false,
                msg: "Error: work proifile location infor not updated"
            });
        } else {
            console.log(newProfessionInfo);
            response.status(200).json({
                success: true,
                professionionInfo: newProfessionInfo
            })
        }    
    })
 });
});

// update certification tab
workProfileExpressRoute.route('/workProfile/certification-update').post((request, response, next) =>{
    const { body } = request;
    // console.log('body', body);
    let {
        userId,
        gmcNumber,
        gmcImage,
        f1CertImage,
        medicalCertImage,
        vaccinationHistImage

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
        } else if (userList.length < 0 || userList.length >1)  {
            console.log(users)
            return response.send({
                success: false,
                message:'Error: More a than one user found'
            });
        }

    const user = userList[0];

    const newCertificationInfo = new WorkProfileSchema();
    newCertificationInfo._id = userId;
    newCertificationInfo.gmcNumber = gmcNumber;
    newCertificationInfo.gmcImage = gmcImage;
    newCertificationInfo.f1CertImage = f1CertImage;
    newCertificationInfo.medicalCertImage = medicalCertImage;
    newCertificationInfo.vaccinationHistImage = vaccinationHistImage;

    WorkProfileSchema.findOneAndUpdate({'_id': userId}, newCertificationInfo, {upsert:true}, function(error, doc){

        if (error) {
            console.error(error);
            return response.send({
                success: false,
                msg: "Error: work proifile location infor not updated"
            });
        } else {
            console.log(newCertificationInfo);
            response.status(200).json({
                success: true,
                certificationInfo: newCertificationInfo
            })
        }    
    })
 });
});

workProfileExpressRoute.route('/workprofiles').get((request, response) =>{
    WorkProfileSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})

// return workprofile for userId
workProfileExpressRoute.route('/get-workProfile/:userId').get((request, response) => {
    WorkProfileSchema.findById(request.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // In the event of an ok response output the message
            response.status(200).json({
                workprofile: data
            })
        }
    })
})

module.exports = workProfileExpressRoute;