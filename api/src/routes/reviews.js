const reviewsRoute = require('express').Router();
const revValidator = require('../middlewares/revValidator');
const getReviews = require('../controllers/reviews/getReviews');
const postReviews = require('../controllers/reviews/postReviews');
const updateReviews = require('../controllers/reviews/updateReviews');
const deleteReviews = require('../controllers/reviews/deleteReviews');
const userExtractor = require('../middlewares/userExtractor');

reviewsRoute
  .get('/:localId', getReviews)
  .post('/:localId', revValidator, userExtractor, postReviews)
  .put('/:reviewId', revValidator, userExtractor, updateReviews)
  .delete('/:reviewId', userExtractor, deleteReviews);

module.exports = reviewsRoute;
