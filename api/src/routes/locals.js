const localsRoute = require('express').Router();
const getLocals = require('../controllers/locals/getLocals');
const postLocal = require('../controllers/locals/postLocal');
const putLocal = require('../controllers/locals/putLocal');
const deleteLocal = require('../controllers/locals/deleteLocal');
const paramLocal = require('../controllers/locals/paramLocal');
const getLocalsDetail = require('../controllers/locals/getLocalsDetail');
// const userExtractor = require('../middlewares/userExtractor');

localsRoute.param('localId', paramLocal);
localsRoute.get('/', getLocals);
// localsRoute.post('/', userExtractor, postLocal);
localsRoute.post('/', postLocal);
localsRoute.get('/:localId', getLocalsDetail);
localsRoute.put('/:localId', putLocal);
localsRoute.delete('/:localId', deleteLocal);

module.exports = localsRoute;
