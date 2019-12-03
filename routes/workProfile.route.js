const express = require('express');
const mongodb = require('mongodb')

const binary = mongodb.Binary


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
        } else if (userList.length < 0 || userList.length == 0 || userList.length >1)   {
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
        } else if (userList.length < 0 || userList.length == 0 || userList.length >1)   {
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

    //let binaryCvImage =  new Buffer(binary(cvImage));
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
        } else if (userList.length < 0 || userList.length == 0 || userList.length >1)   {
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
        vaccinationHistImage,
        references,

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
        } else if (userList.length < 0 || userList.length == 0 || userList.length >1)   {
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
    newCertificationInfo.references = references;

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

//Example of a crud get query based on the user Id supplied
// return workprofile for userId
workProfileExpressRoute.route('/get-workProfile/:userId').get((request, response) => {
    // request.params.{value id the params field} is where valeus are stored
    WorkProfileSchema.find({
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
                workProfile: data[0]
            });        
        }
    })
})

workProfileExpressRoute.route('/workProfile/delete/:id').delete((request , response, next) => {    
    CardInfoSchema.findByIdAndRemove(request.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // In the event of an ok response output the message
            response.status(200).json({
                deletedWorkProfile: data
            })
        }
    })
})

module.exports = workProfileExpressRoute;