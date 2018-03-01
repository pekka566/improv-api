const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema(
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
