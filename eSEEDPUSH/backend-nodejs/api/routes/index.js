 var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  authCtrl = require('../controllers/auth.controller'),
  userCtrl = require('../controllers/user.controller');
  //expert = require('../controllers/expert.controller');
 
  var isAuthenticated = function(req, res, next) {
    // Check that the request has the JWT in the authorization header
    var token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({
        error: null,
        msg: 'You have to login first before you can access your lists.',
        data: null
      });
    }
    // Verify that the JWT is created using our server secret and that it hasn't expired yet
    jwt.verify(token, req.app.get('secret'), function(err, decodedToken) {
      if (err) {
        return res.status(401).json({
          error: err,
          msg: 'Login timed out, please login again.',
          data: null
        });
      }
      req.decodedToken = decodedToken;
      next();
    });
  };

var isNotAuthenticated = function(req, res, next) {
  // Check that the request doesn't have the JWT in the authorization header
  var token = req.headers['authorization'];
  if (token) {
    return res.status(403).json({
      error: null,
      msg: 'You are already logged in.',
      data: null
    });
  }
  next();
};
/*var isExpert = function(req,res,next){
  if(req.decodedToken.user.role.trim() !== 'expert' && req.decodedToken.user.role.trim() !== 'Expert' ){
    return res.status(403).json({
       err: null,
       msg: 'Unauthorized.',
       data: null 
    });
  }
  next();
};*/
// all the methods below are all routers where we specify a route for api.service to 
// call and what method in the backend to go with the specefied route 
//-----------------------------Authentication Routes-------------------------
router.post('/auth/login' , isNotAuthenticated , authCtrl.login);
router.post('/auth/signup' , isNotAuthenticated , authCtrl.signup);
router.get('/user/getEmployees' , isAuthenticated , userCtrl.getEmployees);
router.post('/user/addEmployees' , isAuthenticated , userCtrl.addEmployees);
router.post('/user/deleteEmployee' , isAuthenticated , userCtrl.deleteEmployee);

module.exports = router;