const localsRoute = require('express').Router();
const getLocals = require('../controllers/locals/getLocals');
const postLocal = require('../controllers/locals/postLocal');
const putLocal = require('../controllers/locals/putLocal');
const deleteLocal = require('../controllers/locals/deleteLocal');
const paramLocal = require('../controllers/locals/paramLocal');
const getLocalsDetail = require('../controllers/locals/getLocalsDetail');
const localValidator = require('../middlewares/localValidator');
const getQueryLocals = require('../controllers/locals/getQueryLocals');
const userExtractor = require('../middlewares/userExtractor');
const getLocalsName = require('../controllers/locals/getLocalsName');

localsRoute.get('/', getQueryLocals, getLocals);
localsRoute.get('/page/:numPage', getQueryLocals, getLocals);
localsRoute.get('/search-by-name', getLocalsName);
localsRoute.param('localId', paramLocal);
localsRoute.post('/', userExtractor, localValidator, postLocal);
localsRoute.get('/:localId', getLocalsDetail);
localsRoute.put('/:localId', localValidator, putLocal);
localsRoute.delete('/:localId', deleteLocal);

module.exports = localsRoute;
