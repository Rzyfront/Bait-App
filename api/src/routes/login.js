const loginRoute = require('express').Router();
const getLoginGoogle = require('../controllers/login/getLoginGoogle');
const postLogin = require('../controllers/login/postLogin');

loginRoute.get('/google', getLoginGoogle);
loginRoute.post('/', postLogin);

module.exports = loginRoute;
