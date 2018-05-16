var mongoose = require('mongoose'),
  moment = require('moment'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config/appconfig').EMAIL_REGEX,
  User = mongoose.model('User'),
  Employee = mongoose.model('Employee'),
  Attendance = mongoose.model('Attendance'),
  moment = require('moment');
var Binary = require('mongodb').Binary;
var fs = require('fs');
var bcrypt = require('bcryptjs');
var RegExp = require('mongodb').RegExp;
 


module.exports.getEmployees = function(req, res, next) {
  Employee.find({}).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Employees retrieved successfully.',
      data: user
    });
  });
};

module.exports.addEmployees = function(req, res, next) {
  var valid = req.body.name && Validations.isString(req.body.name)
  && req.body.email && Validations.isString(req.body.email) 
  && req.body.mobileNumber && Validations.isNumber(req.body.mobileNumber) 
  && req.body.hireDate && Validations.isString(req.body.hireDate); 
  if(!valid){
    return res.status(422).json({
      err: null,
      msg: 'Please insert all employees data with valid forms.',
      data: null
      });
    } 
    
    Employee.findOne({
      email : { $eq : req.body.email } 
    },function(err,emp){
      if (err){
        return next(err);
      }
      if (!emp) {
        
        
          Employee.create(req.body, function(err, newEmployee) {
            if (err) {
              return next(err);
            }
            return res.status(201).json({
              err: null,
              msg: 'New employee added successfully',
              data: newEmployee
            });
          });
        
      }
      else{
        return res.status(404).json({ 
          err: null, 
          msg:  'This employee already exists (same email)',
          data: null 
         });
      }
      //need to check on role first before adding the speciality
      // If Tag was found in tag table then add it in user table
    
  });
};

module.exports.deleteEmployee = function(req, res, next) {
  var valid = req.body.email && Validations.isString(req.body.email); 
  if(!valid){
    return res.status(422).json({
      err: null,
      msg: 'Please insert email of employee to delete correctly.',
      data: null
      });
    } 
    
    Employee.findOne({
      email : { $eq : req.body.email } 
    },function(err,emp){
      if (err){
        return next(err);
      }
      if (!emp) {
       
        return res.status(404).json({ 
          err: null, 
          msg:  'There is no such employee with this email to delete.',
          data: null 
         });
      }
      else{
        
        Employee.findOneAndRemove({email : { $eq : req.body.email }}, function(err, delEmployee) {
          if (err) {
            return next(err);
          }
          return res.status(201).json({
            err: null,
            msg: 'Employee deleted',
            data: delEmployee
          });
        });
      
      }
      //need to check on role first before adding the speciality
      // If Tag was found in tag table then add it in user table
    
  });
};
//(Day,Working hours,Employee,Status
module.exports.addToattendance = function(req, res, next) {
  var valid = req.body.day && Validations.isString(req.body.day)
  && req.body.workingHours && Validations.isString(req.body.workingHours) 
  && req.body.employee && Validations.isObjectId(req.body.employee) 
  && req.body.status && Validations.isString(req.body.status); 
  if(!valid){
    return res.status(422).json({
      err: null,
      msg: 'Please insert all employees data with valid forms.',
      data: null
      });
    } 
    
    Attendance.findOne({
      employee : { $eq : req.body.empoyee } , day : { $eq: req.body.day}
    },function(err,emp){
      if (err){
        return next(err);
      }
      if (!emp) {
        
        
          Attendance.create(req.body, function(err, newattend) {
            if (err) {
              return next(err);
            }
            return res.status(201).json({
              err: null,
              msg: 'New employee attendance record added successfully',
              data: newattend
            });
          });
        
      }
      else{
        return res.status(404).json({ 
          err: null, 
          msg:  'This employees attendance already exists',
          data: null 
         });
      }
      //need to check on role first before adding the speciality
      // If Tag was found in tag table then add it in user table
    
  });
};

/*
module.exports.getUserProfile = function (req, res) {
  User.findOne({ username: { $eq: req.params.username } }).populate('speciality').populate('bookmarks' , 'username role img').exec(function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'user not found',
        data: null
      });
    } else {
      return res.status(201).json({
        err: null,
        msg: null,
        data: user
      });
    }
  });
};

module.exports.getUserData = function (req, res) {
  User.findById(req.decodedToken.user._id).exec(function (err, user) {
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'user not found',
        data: null
      });
    }
    else if (err) {
      return next(err);
    }
    else {
      return res.status(201).json({
        err: null,
        msg: null,
        data: user
      });
    }
  });
};

module.exports.getusername = function (req, res) {
  User.findById(req.decodedToken.user._id).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    return res.status(201).json({
      err: null,
      msg: null,
      data: user.username
    });
  });
};






module.exports.findUserbyId = function (req, res, next) {
  console.log(req.body);
  User.find({ _id: req.body  }).exec(function (err, User) {
    if (err) {
      return next(err);
    }
    if (!User) {
      return res.status(404).json({
        err: null,
        msg: 'This Tag is not found ',
        data: null
      });
    }

    return res.status(201).json({
      err: null,
      msg: 'Succesfully retrieved Users',
      data: User
    });
  })
};*/
