const imageRoute = require('express').Router();
const getImages = require('../controllers/images/getImages');
const postImages = require('../controllers/images/postImages');

imageRoute.get('/', getImages);
imageRoute.post('/', postImages);

module.exports = imageRoute;
