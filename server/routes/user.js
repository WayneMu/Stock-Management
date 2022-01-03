const express = require('express');
const router = express.Router();
const app = express();
const userController = require('../controllers/userController');

// Routes
app.get('/user', userController.view);
app.post('/user', userController.find);
app.get('/adduser', userController.form);
app.post('/adduser', userController.create);
app.get('/edituser/:id', userController.edit);
app.post('/edituser/:id', userController.update);
app.get('/viewuser/:id', userController.viewall);
app.get('/user/:id',userController.deleter);
  
module.exports = app;