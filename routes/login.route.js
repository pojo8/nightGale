const express = require('express');
const app = express();

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