const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let db;
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', function() {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

mongoose.connection.once('open', function() {
  console.log('Successfully connected to the database');
});

require('./routes.js')(app);

app.listen(port, function() {
  console.log('Server is listening on port ' + port);
});
