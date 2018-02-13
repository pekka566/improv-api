const Mongonaut = require('mongonaut');
require('dotenv').config();
const dataFile = './improv_exercises.json';

const mongonaut = new Mongonaut({
  host: process.env.MONGODB_HOST,
  user: process.env.MONGODB_USER,
  pwd: process.env.MONGODB_PASSWD,
  db: 'improv_exercises',
  collection: 'exercises'
});

console.log('Mongonaut config: ', mongonaut);

mongonaut
  .import(dataFile)
  .then(function(response) {
    console.log('Success: ', response);
  })
  .catch(function(err) {
    console.log('Promise Rejected: ', err);
  });
