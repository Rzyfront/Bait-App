const localsRoute = require('express').Router();
const getLocals = require('../controllers/Locals/getLocals');
const postLocal = require('../controllers/Locals/postLocal');

localsRoute.get('/', getLocals);
localsRoute.post('/', postLocal);

module.exports = localsRoute;
