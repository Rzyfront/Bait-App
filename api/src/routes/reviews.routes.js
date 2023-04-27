const reviewsRoute = require('express').Router();
const {
  revValidator,
  userExtractor,
  setReviewQuery,
} = require('../middlewares');
const {
  deleteReviews,
  getReviews,
  postReviews,
  updateReviews,
} = require('../controllers/reviews');

reviewsRoute
  .get('/:localId', setReviewQuery, getReviews)
  .post('/:localId', revValidator, userExtractor, postReviews)
  .put('/:reviewId', revValidator, userExtractor, updateReviews)
  .delete('/:reviewId', userExtractor, deleteReviews);

module.exports = reviewsRoute;
