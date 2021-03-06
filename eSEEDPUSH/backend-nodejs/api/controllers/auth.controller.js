var mongoose = require('mongoose'),
  fs = require('fs'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config/appconfig').EMAIL_REGEX,
  User = mongoose.model('User'),
  crypto = require('crypto');
  //nodemailerController = require('./nodemailer.controller');

// authenticating sender email
module.exports.login = function (req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there
  var valid =
    req.body.email &&
    Validations.isString(req.body.email) &&
    Validations.matchesRegex(req.body.email, EMAIL_REGEX) &&
    req.body.password &&
    Validations.isString(req.body.password);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'email(String and of valid email format) and password(String) are required fields.',
      data: null
    });
  }

  // Find the user with this email from the database
  User.findOne({ email: req.body.email.trim().toLowerCase() }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    // If user not found then he/she is not registered
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    // If user found then check that the password he entered matches the encrypted hash in the database
    Encryption.comparePasswordToHash(req.body.password, user.password, function (err, passwordMatches) {
      if (err) {
        return next(err);
      }
      // If password doesn't match then its incorrect
      if (!passwordMatches) {
        return res
          .status(401)
          .json({ err: null, msg: 'Password is incorrect.', data: null });
      }
      //if (user.blocked)
        //return res.status(401).json({ err: null, msg: 'Blocked', data: null });
      
        // Create a JWT and put in it the user object from the database

      //delete user.blocked;
      var token = jwt.sign(
        {
          // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
          user: user
        },
        req.app.get('secret'),
        {
          expiresIn: '12h'
        }
      );
      res.status(200).json({ err: null, msg: 'Welcome', data: token });
    });
  });
};

//===========================================================================


module.exports.signup = function(req, res, next) {
  var valid =  req.body.name && Validations.isString(req.body.name) &&
    req.body.password && Validations.isString(req.body.password) && 
    req.body.email && Validations.isString(req.body.email);
    console.log(req.body);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name (String) , email (String) , and password (String) are required fields.',
      data: null
    });
  }
  User.findOne({ email:{ $eq: req.body.email } }, function(err, user){
    if (err)
      throw err;
    if (user == null){
      var password = req.body.password.trim();
      Encryption.hashPassword(password, function(err, hash) {
        if (err) {
          return next(err);
        }
        req.body.password = hash;
        /*---------------------------------------------------*/ // Temp For Now
       
      
        User.create(req.body, function(err, newUser) {
          if (err) {
            return next(err);
          }
          return res.status(201).json({
            err: null,
            msg: 'Registration successful, you can now login to your account.',
            data: newUser
          });
        });
      });
    } else
      return res.status(209).json({
        err: null,
        msg: 'Registration Failed',
        data: null
      })
  })
};