const bcrypt = require('bcrypt');

const User = require('../model/userModel');

exports.create = (req, res) => {
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    });

    user.save((err, data) => {
      console.log(data);
      if (err) {
        console.log(err);
        res
          .status(500)
          .send({ message: 'Some error ocuured while creating the user.' });
      } else {
        res.status(200).send({ username: user.username, email: user.email });
      }
    });
  } else {
    res.status(404).send({ message: 'Reruired data was missing!' });
  }
};

//authenticate input against database
const authenticateUser = (email, password, callback) => {
  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (!user) {
      return callback(new Error('User not found.'));
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

exports.authenticate = (req, res) => {
  if (req.body.email && req.body.password) {
    authenticateUser(req.body.email, req.body.password, (error, user) => {
      if (error || !user) {
        res.status(404).send({ message: 'Wrong email or password.' });
      } else {
        res.status(200).send({ username: user.username, email: user.email });
      }
    });
  } else {
    res.status(404).send({ message: 'Reruired data was missing!' });
  }
};

exports.findOne = (req, res) => {
  const query = User.find({ username: req.params.username });
  query.exec((err, data) => {
    if (err) {
      res.status(500).send({
        message: 'Could not retrieve user with username ' + req.params.username
      });
    } else if (data.length === 0) {
      res.status(204).send('');
    } else {
      res.send({ username: data[0].username });
    }
  });
};
