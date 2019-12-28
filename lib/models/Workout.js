const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  date: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  muscleGroup: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Workout', schema);
