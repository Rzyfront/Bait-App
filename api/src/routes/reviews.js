const reviewsRoute = require('express').Router();
const getReviews = require('../controllers/reviews/getReviews');
const postReviews = require('../controllers/reviews/postReviews');

reviewsRoute.get('/', getReviews);
reviewsRoute.post('/', postReviews);

module.exports = reviewsRoute;
