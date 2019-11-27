const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

// Express route
const loginExpressRoute  = express.Router();

// imported Schemas
let UserSchema = require('../model/user.model');
let UserSessionSchema = require('../model/userSession.model');

// saves the user if the registered email address does not exist
loginExpressRoute.route('/account/signup').post((request, response, next) =>{
    const { body } = request;
    // console.log('body', body);
    let {
        firstName,
        lastName,
        email,
        password
    } = body;

    if(!firstName || !lastName || !email || !password) {
        return response.send({
            success: false,
            message: 'Error: Fill in all the sign up fields'
        })
    }


    email = email.toLowerCase();    

    // verify email doesnt exist
    // FIXME validate email
    UserSchema.find({
        email: email
    }, (error, previousUsers) => {
        if (error) {
            return response.send({
                success: false,
                message:'Error: Server error'
            });
        } else if (previousUsers.length > 0)  {
            return response.send({
                success: false,
                message:'Error: Account already exists'
            });
        }

    // save new user
    const newUser = new UserSchema();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);
    console.log('befire save')
    newUser.save(function(error, user){
        if (error) {
            return response.send({
                success: false,
                msg: "Error: account not created"
            });
        } else {
            console.log(user);
            response.status(200).json({
                success: true,
                AddedUser: user
            })
        }    
    })
 });
});

//Sign in
loginExpressRoute.route('/account/login').post((request, response, next) =>{
    const { body } = request;
    const{
        password
    } = body;

    let {email} = body;

    if(!email || !password) {
        response.send({
            success: false,
            message: 'Error: Fill in all the login fields'
        });
        }

    email = email.toLowerCase();
    // verify email doesnt exist
    // FIXME validate email
    UserSchema.find({
        email: email
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
                message:'Error: Invalid'
            });
        }

    const user = userList[0];
    if (!user.validPassword(password)) {
        return response.send({
            success: false,
            message:'Error: Invalid'
        });
    }
        // correct USer
        const userSession = new UserSessionSchema();
        userSession.userId = user._id;
        userSession.save((error, session) => {
            if (error) {
                return response.send({
                    success: false,
                    messge: 'Error: server error',
                });
            }
            // FIXME remove 
            //  console.log('User id:'+user._id);
            // console.log('Session id: '+ session._id);

            return response.send({
                success: true,
                message: 'Valid sign in',
                // token is linked to the user id
                token: session._id,
                uid: user._id,

            });
        })
    })
});

//Logout sessions deletes
loginExpressRoute.route('/account/logout').get((request, response, next) =>{
    // Get the token
    const { query } = request;
    const { token } = query;
    
    //Finds the available token and sets deleted to true
    UserSessionSchema.findOneAndUpdate({
        _id: token,
        isDeleted: false
    },{
       $set:{
        isDeleted:true
        } 
    }, null, (error, sessions) => {
        if (error) {
          console.log(err);
          return response.send({
            success: false,
            message: 'Error: Server error'
          });
        }      return response.send({
          success: true,
          message: 'Good'
        });
      });
    });

// update certification tab
loginExpressRoute.route('/account/user-update').post((request, response, next) =>{
        const { body } = request;
        // console.log('body', body);
        let {
            userId,
            firstName,
            lastName,
            email,
            hourlyRate,  
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
    
        //const user = userList[0];
    
        const updateUserInfo = new UserSchema();
        updateUserInfo._id = userId;
        updateUserInfo.firstName = firstName;
        updateUserInfo.lastName = lastName;
        updateUserInfo.email = email;
        updateUserInfo.hourlyRate = hourlyRate;

    
        UserSchema.findOneAndUpdate({'_id': userId}, updateUserInfo, {upsert:true}, function(error, doc){
    
            if (error) {
                console.error(error);
                return response.send({
                    success: false,
                    msg: "Error: work proifile location infor not updated"
                });
            } else {
                console.log(updateUserInfo);
                response.status(200).json({
                    success: true,
                    userInfo: updateUserInfo
                })
            }    
        })
     });
});

loginExpressRoute.route('/account/get-user/:userId').get((request, response) => {
    // request.params.{value id the params field} is where valeus are stored
    UserSchema.find({
        _id: request.params.userId
    }, (error, data) => {
        if (error) {
            return response.send({
                success: false,
                messaged: 'Error: Server error'
            });
        } else {
            // In the event of an ok response output the messageworkProfile
            return response.send({
                success: true,
                // This is to get only first result form array of results
                userProfile: data[0]
            });        
        }
    })
})

//FIXME add the implementation
// force change with email password and uid
loginExpressRoute.route('/account/changePassword').post((request, response, next) =>{
    const { body } = request;
    const{
        userId,
        password,
        email,
    } = body;

    if(!email || !password) {
        response.send({
            success: false,
            message: 'Error: Fill in all the required fieldsfields'
        });
        }

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
                message:'Error: Invalid'
            });
        }

   // const user = userList[0];

    const updatedUser = new UserSchema()
    
    // Removes the force pwd update and sets new password 
    updatedUser.password = updatedUser.generateHash(password);
    updatedUser._id = userId;
    updatedUser.email = email;
    updatedUser.forcePasswordReset =  false;

    // updates the user password
    UserSchema.findOneAndUpdate({'_id': userId, 'email': email}, updatedUser, {upsert:true}, function(error, doc){

        if (error) {
            console.error(error);
            return response.send({
                success: false,
                msg: "Error: updating the new user password"
            });
        } else {
            return response.send({
                success: true,
                forcePasswordReset:false,
            });
        }    
    })
 });
});

loginExpressRoute.route('/account/change-password').post((request, response, next) =>{
    const { body } = request;
    const{
        userId,
        password,
       // email,
    } = body;

    if(!password) {
        response.send({
            success: false,
            message: 'Error: Fill in all the required fieldsfields'
        });
        }

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
                message:'Error: Invalid'
            });
        }

   // const user = userList[0];

    const updatedUser = new UserSchema()
    
    // Removes the force pwd update and sets new password 
    updatedUser.password = updatedUser.generateHash(password);
    updatedUser._id = userId;
    updatedUser.forcePasswordReset =  false;

    // updates the user password
    UserSchema.findOneAndUpdate({'_id': userId}, updatedUser, {upsert:true}, function(error, doc){

        if (error) {
            console.error(error);
            return response.send({
                success: false,
                msg: "Error: updating the new user password"
            });
        } else {
            response.status(200).json({
                success: true,
                forcePasswordReset:false,
            })
        }    
    })
 });
});

// FIXME add teh implementations
//forgot password
loginExpressRoute.route('/account/forgot-password').post((request, response, next) =>{
    const { body } = request;

    let {email} = body;

    if(!email) {
        response.send({
            success: false,
            message: 'Error: Email is not in the db'
        });
        }

    email = email.toLowerCase();
    // verify email doesnt exist
    // FIXME validate email
    UserSchema.find({
        email: email
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
                message:'Error: Invalid'
            });
        }

    const user = userList[0];
    // if (!user.generateRandPassword(password)) {
    //     return response.send({
    //         success: false,
    //         message:'Error: Invalid'
    //     });
    // }   

    const updatedUser = new UserSchema();


    // const randomString = Math.random().toString();
    const dateStr = Date.now().toString()
    const updatedToken = updatedUser.generateRandPassword(dateStr);
    console.warn('The random seed used to create reset pwd' + dateStr)
    console.warn('The updated pwd' + updatedToken)
    
    updatedUser._id = user._id;
    updatedUser.resetPasswordToken = updatedToken;
    updatedUser.resetPasswordExpiry = Date.now() + 360000;
    updatedUser.forcePasswordReset =  true;

    // updates the user password
    UserSchema.findOneAndUpdate({'email': email}, updatedUser, {upsert:true}, function(error, doc){

        if (error) {
            console.error(error);
            return response.send({
                success: false,
                msg: "Error: updating the new user password"
            });
        } else {
            
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        //   user: `${process.env.EMAIL_ADDRESS}`,
        //   pass: `${process.env.EMAIL_PASSWORD}`,
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${user.email}`,
        subject: 'Temporary Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
          + 'Please use the temporary password to login within one hour of receiving it:\n\n'
          + `${updatedToken}\n\n`
          + 'Sfter logging in you will be prompted to change your password.\n',
      };

      console.log('sending mail');

      // 
      transporter.sendMail(mailOptions, (error, data) =>{
          if(error){
            response.send({
                success: false,
                forcePasswordReset:false,
                message: data
            });

          } else {
            return response.send({
                    success: true,
                    forcePasswordReset:true,
                });
          }
      })

//       transporter.sendMail(mailOptions, (err, response) => {
//         if (err) {
//           console.error('there was an error: ', err);
//         } else {
//           console.log('here is the res: ', response);
//           res.status(200).json('recovery email sent');
//         }

            // response.status(200).json({
            //     success: true,
            //     forcePasswordReset:true,
            // })
        }    
    })
 });
});

// UserSchema.findOne({
//     where: {
//     email: email,
//     },
// }).then((user) => {
//     if (user === null) {
//       console.error('email not in database');
//       res.status(403).send('email not in db');
//     } else {
//       const token = updatedUser.generateRandPassword(Math.random().toString());
//       console.log('Updated token'+token);
//       user.update({
//         resetPasswordToken: token,
//         resetPasswordExpires: Date.now() + 360000,
//       });

//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: `${process.env.EMAIL_ADDRESS}`,
//           pass: `${process.env.EMAIL_PASSWORD}`,
//         },
//       });

//       const mailOptions = {
//         from: 'mySqlDemoEmail@gmail.com',
//         to: `${user.email}`,
//         subject: 'Link To Reset Password',
//         text:
//           'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
//           + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
//           + `http://localhost:3031/reset/${token}\n\n`
//           + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
//       };

//       console.log('sending mail');

//       transporter.sendMail(mailOptions, (err, response) => {
//         if (err) {
//           console.error('there was an error: ', err);
//         } else {
//           console.log('here is the res: ', response);
//           res.status(200).json('recovery email sent');
//         }
//       });
//     }
//   });
// });

//Verifies the session Id
loginExpressRoute.route('/account/verify').get((request, response, next) =>{
    // Get the token
    const { query } = request;
    const { token } = query;
    
    // Verify the token is one of a kind and its not deleted
    UserSessionSchema.find({
        _id: token,
        isDeleted: false
    }, (error, sessions) => {
        if (error) {
            return response.send({
                success: false,
                messaged: 'Error: Server error'
            });
        }

        if (sessions.length !=1) {
            return response.send({
                success: false,
                message: 'Error: Invalid'
            });
        } else {
            return response.send({
                success: true,
                message: 'Good'
            });
        }
    });
});

// Delete user
loginExpressRoute.route('/account/delete-user/:id').delete((request , response, next) => {    
    UserSchema.findByIdAndRemove(request.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // In the event of an ok response output the message
            response.status(200).json({
                deletedUser: data
            })
        }
    })
})

// Return all users
//FIXME to not return password
loginExpressRoute.route('/account/users').get((request, response) =>{
    UserSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})
 
// login
loginExpressRoute.route('/login/').get((request, response) =>{
    UserSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})

module.exports = loginExpressRoute;