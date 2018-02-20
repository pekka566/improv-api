const Exercise = require('./model.js');

exports.create = function(req, res) {
  if (!req.body.content) {
    res.status(400).send({ message: 'Exercise can not be empty' });
  } else {
    res.status(400).send({ message: 'Not supported yet!' });
  }

  var exercise = new Exercise({
    // todo
  });

  exercise.save((err, data) => {
    console.log(data);
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: 'Some error ocuured while creating the Exercise.' });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = function(req, res) {
  console.log('findAll');
  Exercise.find(function(err, exercises) {
    if (err) {
      res
        .status(500)
        .send({ message: 'Some error ocuured while retrieving exercises.' });
    } else {
      res.send(exercises);
    }
  });
};

exports.findOne = function(req, res) {
  Exercise.findById(req.params.exerciseId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: 'Could not retrieve exercise with id ' + req.params.exerciseId
      });
    } else {
      res.send(data);
    }
  });
};

exports.update = function(req, res) {
  res.status(400).send({ message: 'Not supported yet!' });

  Exercise.findById(req.params.exerciseId, function(err, exercise) {
    if (err) {
      res.status(500).send({
        message: 'Could not find a Exercise with id ' + req.params.exerciseId
      });
    }

    exercise.title = req.body.title;
    exercise.content = req.body.content;

    Exercise.save((err, data) => {
      if (err) {
        res.status(500).send({
          message: 'Could not update Exercise with id ' + req.params.exerciseId
        });
      } else {
        res.send(data);
      }
    });
  });
};

exports.delete = function(req, res) {
  res.status(400).send({ message: 'Not supported yet!' });
  Exercise.remove({ _id: req.params.exerciseId }, (err, data) => {
    if (err) {
      res.status(500).send({
        message: 'Could not delete exercise with id ' + req.params.id
      });
    } else {
      res.send({ message: 'Exercise deleted successfully!' });
    }
  });
};
