const administratorRoute = require('express').Router();
const getAdministrators = require('../controllers/administrator/getAdministrators');
const putCreateAdmin = require('../controllers/administrator/putCreateAdmin');
const deleteAdministrator = require('../controllers/administrator/deleteAdministrator');
const changeRole = require('../controllers/administrator/changeRole');
const userExtractor = require('../middlewares/userExtractor');
const { verifyDelete } = require('../middlewares/userMiddlewares');
const { isSuperAdmin } = require('../middlewares/validateRole');

administratorRoute
  .get('/', userExtractor, getAdministrators)
  .put('/:userId', userExtractor, isSuperAdmin, putCreateAdmin)
  .delete('/', userExtractor, verifyDelete, deleteAdministrator)
  .patch('/role/:userId', userExtractor, changeRole);

module.exports = administratorRoute;
