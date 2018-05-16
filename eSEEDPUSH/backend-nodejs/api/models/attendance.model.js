var mongoose = require('mongoose');
var fs = require('fs');
var attendSchema = mongoose.Schema( {

  day: {
    type: String
  },

  workingHours: {
    type: Number,
    required: true,
  },

  employee: {
    type: mongoose.Schema.Types.ObjectId , 
    ref: 'Employee',
    required: true
  },

  satus: {
    type: String, //Present,Absent,Sick Leave,Day OFF
    required: true
  },

}, { collection: 'attendances' } );

//sessionId: { type: mongoose.Schema.Types.ObjectId , ref: 'Session'} ,

module.exports = mongoose.model('Attendance', attendSchema);