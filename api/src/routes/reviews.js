const reviewsRoute = require('express').Router();
const getReviews = require('../controllers/reviews/getReviews');
const postReviews = require('../controllers/reviews/postReviews');
const updateReviews = require('../controllers/reviews/updateReviews');
const deleteReviews = require('../controllers/reviews/deleteReviews');

reviewsRoute.get('/:reviewId', getReviews);
reviewsRoute.post('/:localId', postReviews);
reviewsRoute.put('/:reviewId', updateReviews);
reviewsRoute.delete('/:reviewId', deleteReviews);

module.exports = reviewsRoute;
