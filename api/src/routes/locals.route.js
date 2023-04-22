const localsRoute = require('express').Router();
const deleteLocal = require('../controllers/locals/deleteLocal');
const getLocals = require('../controllers/locals/getLocals');
const getLocalsDetail = require('../controllers/locals/getLocalsDetail');
const getLocalsName = require('../controllers/locals/getLocalsName');
const getMenu = require('../controllers/menu/getMenu');
const getMenuDetail = require('../controllers/menu/getMenuDetail');
const getQueryLocals = require('../controllers/locals/getQueryLocals');
const getSpecialties = require('../controllers/locals/getSpecialties');
const localValidator = require('../middlewares/localValidator');
const paramLocal = require('../controllers/locals/paramLocal');
const postLocal = require('../controllers/locals/postLocal');
const postMenu = require('../controllers/menu/postMenu');
const putLocal = require('../controllers/locals/putLocal');
const userExtractor = require('../middlewares/userExtractor');
const { isOwner, isTheOwnerOrAdmin } = require('../middlewares/validateRole');

localsRoute
  .get('/', getQueryLocals, getLocals)
  .get('/menu/:menuId', getMenuDetail)
  .get('/page/:numPage', getQueryLocals, getLocals)
  .get('/search-by-name', getLocalsName)
  .get('/specialties', getSpecialties)
  .param('localId', paramLocal)
  .post('/', userExtractor, localValidator, postLocal)
  .get('/:localId', getLocalsDetail)
  .get('/:localId/menu', getMenu)
  .post('/:localId/menu', userExtractor, isOwner, isTheOwnerOrAdmin, postMenu)
  .put('/:localId', userExtractor, isOwner, isTheOwnerOrAdmin, localValidator, putLocal)
  .delete('/:localId', userExtractor, isOwner, isTheOwnerOrAdmin, deleteLocal);

module.exports = localsRoute;
