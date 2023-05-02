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
  postAcquisitionRequest,
  postDocument,
  getDocument,
  getServeDocument,
} = require('../controllers/locals');
const { isOwner, isAdmin } = require('../middlewares/validateRole');
const multerDocs = require('../config/multerDocs.');

localsRoute
  .post('/document', multerDocs.single('document'), postDocument)
  .get('/document', getServeDocument)// TODO
  .get('/document/:localId', userExtractor, isAdmin, getDocument)// TODO
  .get('/', setQueryLocals, getLocals)
  .get('/page/:numPage', setQueryLocals, getLocals)
  .get('/:localId/menu', getMenu)
  .post('/', userExtractor, localValidator, postLocal)
  .get('/menu/:menuId', getMenuDetail)
  .delete('/menu/:menuId', userExtractor, isOwner, deleteMenu)
  .get('/search-by-name', getLocalsName)
  .get('/specialties', getSpecialties)
  .param('localId', paramLocal)
  .get('/:localId', getLocalsDetail)
  .post('/acquisition/:localId', userExtractor, postAcquisitionRequest)
  .post('/:localId/menu', userExtractor, isOwner, postMenu)
  .put('/:localId', userExtractor, isOwner, localValidator, putLocal)
  .delete('/:localId', userExtractor, isOwner, deleteLocal);

module.exports = localsRoute;
