var mongoose = require('mongoose');
var fs = require('fs');
var empSchema = mongoose.Schema( {

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  mobileNumber: {
    type: Number,
    required: true
  },

  hireDate: {
    type: String,
    required: true
  },

}, { collection: 'employees' } );


module.exports = mongoose.model('Employee', empSchema);