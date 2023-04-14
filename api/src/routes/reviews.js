const reviewsRoute = require('express').Router();
const getReviews = require('../controllers/reviews/getReviews');
const postReviews = require('../controllers/reviews/postReviews');
const updateReviews = require('../controllers/reviews/updateReviews');
const deleteReviews = require('../controllers/reviews/deleteReviews');

reviewsRoute.get('/', getReviews);
reviewsRoute.post('/', postReviews);
reviewsRoute.put('/:id', updateReviews);
reviewsRoute.delete('/:id', deleteReviews);

module.exports = reviewsRoute;
