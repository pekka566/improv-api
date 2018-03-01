var mongoose = require('mongoose');

var ExerciseSchema = mongoose.Schema(
  {
    Name: String,
    Description: String,
    Notice: String,
    Category: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Exercise', ExerciseSchema);
