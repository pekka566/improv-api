const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let db;
const port = process.env.PORT || 5000;

const app = express();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', function() {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

mongoose.connection.once('open', function() {
  console.log('Successfully connected to the database');
});

const router = express.Router();
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to our api!' });
});
app.use('/', router);
require('./routes/exerciseRoutes.js')(app);
require('./routes/userRoutes.js')(app);

app.listen(port, function() {
  console.log('Server is listening on port ' + port);
});
