const { Router } = require('express');
const Workout = require('../models/Workout');

module.exports = Router()
  .get('/workouts', (req, res, next) => {
    Workout
      .find()
      .then(workouts => res.send(workouts))
      .catch(next);
  })
  .get('/workouts/userId', (req, res, next) => {
        
  })
  .post('/workouts', (req, res, next) => {
    Workout
      .create(req.body)
      .then(workout => res.send(workout))
      .catch(next);
  });




