const reviewsRoute = require('express').Router();
const revValidator = require('../middlewares/revValidator');
const getReviews = require('../controllers/reviews/getReviews');
const postReviews = require('../controllers/reviews/postReviews');
const updateReviews = require('../controllers/reviews/updateReviews');
const deleteReviews = require('../controllers/reviews/deleteReviews');
const userExtractor = require('../middlewares/userExtractor');
const unverifiedreviews = require("../controllers/reviews/unverifiedReviews")
reviewsRoute.get('/unverifiedreviews', unverifiedreviews);
reviewsRoute.get('/:localId', getReviews);

reviewsRoute.post('/:localId', revValidator, userExtractor, postReviews);
reviewsRoute.put('/:reviewId', revValidator, userExtractor, updateReviews);

reviewsRoute.delete('/:reviewId', deleteReviews);

module.exports = reviewsRoute;
