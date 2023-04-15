const localsRoute = require('express').Router();
const getLocals = require('../controllers/locals/getLocals');
const postLocal = require('../controllers/locals/postLocal');
const putLocal = require('../controllers/locals/putLocal');
const deleteLocal = require('../controllers/locals/deleteLocal');
const paramLocal = require('../controllers/locals/paramLocal');
const getLocalsDetail = require('../controllers/locals/getLocalsDetail');
const localValidator = require('../middlewares/localValidator');
const getQueryLocals = require('../controllers/locals/getQueryLocals');
// const userExtractor = require('../middlewares/userExtractor');

localsRoute.get('/', getQueryLocals, getLocals);
localsRoute.param('localId', paramLocal);
// localsRoute.post('/', userExtractor, postLocal);
localsRoute.post('/', localValidator, postLocal);
localsRoute.get('/:localId', getLocalsDetail);
localsRoute.put('/:localId', localValidator, putLocal);
localsRoute.delete('/:localId', deleteLocal);

module.exports = localsRoute;
