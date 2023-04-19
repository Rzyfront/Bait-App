const loginRoute = require('express').Router();
const postLoginGoogle = require('../controllers/login/postLoginGoogle');
const postLogin = require('../controllers/login/postLogin');
const userExtractor = require('../middlewares/userExtractor');

loginRoute
  .get('/', userExtractor)
  .post('/google', postLoginGoogle)
  .post('/', postLogin);

module.exports = loginRoute;
