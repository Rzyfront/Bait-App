const administratorRoute = require('express').Router();
// const getAdministrators = require('../controllers/administrator/getAdministrators');
const putCreateAdmin = require('../controllers/administrator/putCreateAdmin');
const deleteAdministrator = require('../controllers/administrator/deleteAdministrator');
const changeRole = require('../controllers/administrator/changeRole');
const userExtractor = require('../middlewares/userExtractor');
const getUsers = require('../controllers/administrator/getUsers');
const { verifyDelete } = require('../middlewares/userMiddlewares');
const { isSuperAdmin, isAdmin } = require('../middlewares/validateRole');
const patchSupendUser = require('../controllers/administrator/patchSupendUser');
const usersTest = require('../helpers/usersTest');
const setQueryUsers = require('../middlewares/setQueryUsers');

administratorRoute
  .get('/', userExtractor, isAdmin, setQueryUsers, getUsers)
  // .get('/', userExtractor, getAdministrators)
  .put('/createAdmin/:userId', userExtractor, isSuperAdmin, putCreateAdmin)
  .delete('/:userId', userExtractor, verifyDelete, deleteAdministrator)
  .patch('/role/:userId', userExtractor, isAdmin, changeRole)
  .patch('/suspend/:userId', userExtractor, isAdmin, patchSupendUser)
  .post('/test', userExtractor, isSuperAdmin, usersTest);

module.exports = administratorRoute;
