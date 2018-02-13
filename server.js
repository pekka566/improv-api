const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect(
  'mongodb://improvuser:uusikattaus@ds229438.mlab.com:29438/improv_exercises?authSource=improv_exercises',
  (err, client) => {
    if (err) return console.log(err);
    db = client.db('improv_exercises'); // whatever your database name is
    app.listen(3000, () => {
      console.log('listening on 3000');
    });
  }
);

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
