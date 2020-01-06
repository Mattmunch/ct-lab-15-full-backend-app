const { Router } = require('express');
const Review = require('../models/Review');
const ensureAuth = require('../middleware/ensure-auth');


module.exports = Router()
  .get('/', ensureAuth, (req, res, next) => {
    Review
      .find()
      .then(reviews => res.send(reviews))
      .catch(next);
  })
  .get('/:id', ensureAuth, (req, res, next) => {
    Review
      .findById(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  })
  .post('/', ensureAuth, (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Review
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(review => res.send(review))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Review
      .findByIdAndDelete(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });




