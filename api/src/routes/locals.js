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
const { isOwner } = require('../middlewares/validateRole');
const getSpecialties = require('../controllers/locals/getSpecialties');

localsRoute
  .get('/', getQueryLocals, getLocals)
  .get('/page/:numPage', getQueryLocals, getLocals)
  .get('/search-by-name', getLocalsName)
  .get('/specialties', getSpecialties)
  .param('localId', paramLocal)
  .post('/', userExtractor, localValidator, postLocal)
  .get('/:localId', getLocalsDetail)
  .put('/:localId', userExtractor, isOwner, localValidator, putLocal)
  .delete('/:localId', deleteLocal);

module.exports = localsRoute;
