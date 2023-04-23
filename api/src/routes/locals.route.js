const localsRoute = require('express').Router();
const {
  setQueryLocals,
  localValidator,
  userExtractor,
} = require('../middlewares');
const {
  getMenu,
  getMenuDetail,
  postMenu,
  deleteMenu,
} = require('../controllers/menu');
const {
  deleteLocal,
  getLocals,
  getLocalsDetail,
  getLocalsName,
  getSpecialties,
  paramLocal,
  postLocal,
  putLocal,
} = require('../controllers/locals');
const { isOwner, isTheOwnerOrAdmin } = require('../middlewares/validateRole');

localsRoute
  .get('/', setQueryLocals, getLocals)
  .get('/menu/:menuId', getMenuDetail)
  .delete('/menu/:menuId', isOwner, deleteMenu)
  .get('/page/:numPage', setQueryLocals, getLocals)
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
