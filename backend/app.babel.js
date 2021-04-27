'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var cameraRoutes = require('./routes/camera');
var teddyRoutes = require('./routes/teddy');
var furnitureRoutes = require('./routes/furniture');

var app = express();

mongoose.connect('mongodb+srv://will:nAcmfCoHGDgzrCHG@cluster0-pme76.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }).then(function () {
  console.log('Successfully connected to MongoDB Atlas!');
}).catch(function (error) {
  console.log('Unable to connect to MongoDB Atlas!');
  console.error(error);
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());

app.use('/api/cameras', cameraRoutes);
app.use('/api/teddies', teddyRoutes);
app.use('/api/furniture', furnitureRoutes);

module.exports = app;
