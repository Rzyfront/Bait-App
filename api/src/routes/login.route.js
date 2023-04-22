const loginRoute = require('express').Router();
const { userExtractor } = require('../middlewares');
const {
  getMyUser,
  postLogin,
  postLoginGoogle,
} = require('../controllers/login');

loginRoute
  .get('/', userExtractor, getMyUser)
  .post('/google', postLoginGoogle)
  .post('/', postLogin);

module.exports = loginRoute;
