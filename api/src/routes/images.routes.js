const imageRoute = require('express').Router();
const { getImages, postImages } = require('../controllers/images');

imageRoute
  .get('/', getImages)
  .post('/', postImages);

module.exports = imageRoute;
