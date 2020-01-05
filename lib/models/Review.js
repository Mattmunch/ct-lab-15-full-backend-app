const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: String,
  movieTitle: {
    type: String,
    required:true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});
module.exports = mongoose.model('Review', schema);
