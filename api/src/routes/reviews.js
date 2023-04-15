const reviewsRoute = require('express').Router();
const revValidator = require('../middlewares/revValidator');
const getReviews = require('../controllers/reviews/getReviews');
const postReviews = require('../controllers/reviews/postReviews');
const updateReviews = require('../controllers/reviews/updateReviews');
const deleteReviews = require('../controllers/reviews/deleteReviews');

reviewsRoute.get('/:localId', getReviews);
reviewsRoute.post('/:localId', revValidator, postReviews);
reviewsRoute.put('/:reviewId', revValidator, updateReviews);
reviewsRoute.delete('/:reviewId', deleteReviews);

module.exports = reviewsRoute;
