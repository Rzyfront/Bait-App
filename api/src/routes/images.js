const imageRoute = require('express').Router();
const getImages = require('../controllers/images/getImages');

imageRoute.get('/', getImages);

module.exports = imageRoute;
