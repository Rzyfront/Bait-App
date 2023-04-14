const loginRoute = require('express').Router();
const getLoginGoogle = require('../controllers/login/getLoginGoogle');

loginRoute.get('/google', getLoginGoogle);

module.exports = loginRoute;
