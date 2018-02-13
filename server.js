const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let db;
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
  if (err) return console.log(err);
  db = client.db('improv_exercises'); // whatever your database name is
  app.listen(port, () => {
    console.log('listening on... ' + port);
  });
});

app.get('/', (req, res) => {
  db
    .collection('quotes')
    .find()
    .toArray(function(err, results) {
      console.log(results);
      // send HTML file populated with quotes here
    });
  res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  });
});
