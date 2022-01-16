const express = require('express');
const router = express.Router();
const app = express();
const userController = require('../controllers/userController');

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

// Routes
app.get('/user',checkAuthenticated, userController.view);
app.post('/user',checkAuthenticated, userController.find);
app.get('/adduser',checkAuthenticated, userController.form);
app.post('/adduser',checkAuthenticated, userController.create);
app.get('/edituser/:id',checkAuthenticated, userController.edit);
app.post('/edituser/:id',checkAuthenticated, userController.update);
app.get('/viewuser/:id',checkAuthenticated, userController.viewall);
app.get('/user/:id',checkAuthenticated,userController.deleter);
  
module.exports = app;