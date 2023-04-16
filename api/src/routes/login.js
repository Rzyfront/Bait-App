const loginRoute = require('express').Router();
const getLoginGoogle = require('../controllers/login/getLoginGoogle');
const postLogin = require('../controllers/login/postLogin');
const userExtractor = require('../middlewares/userExtractor');

loginRoute.get('/google', getLoginGoogle);
loginRoute.post('/', userExtractor, postLogin);

module.exports = loginRoute;
