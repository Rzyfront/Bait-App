const administratorRoute = require('express').Router();
const getSupendedUsers = require('../controllers/administrator/getSupendedUsers');
const putCreateAdmin = require('../controllers/administrator/putCreateAdmin');
const deleteAdministrator = require('../controllers/administrator/deleteAdministrator');
const changeRole = require('../controllers/administrator/changeRole');
const getUsers = require('../controllers/administrator/getUsers');
const { verifyDelete } = require('../middlewares/userMiddlewares');
const { isSuperAdmin, isAdmin } = require('../middlewares/validateRole');
const patchSupendUser = require('../controllers/administrator/patchSupendUser');
const usersTest = require('../helpers/usersTest');
const setQueryUsers = require('../middlewares/setQueryUsers');
const putAssignLocal = require('../controllers/administrator/putAssignLocal');
const deleteReview = require('../controllers/administrator/deleteReview');

administratorRoute
  .get('/', isAdmin, setQueryUsers, getUsers)
  .get('/page/:numPage', isAdmin, setQueryUsers, getUsers)
  .get('/', isAdmin, getSupendedUsers)
  .put('/createAdmin/:userId', isSuperAdmin, putCreateAdmin)
  .delete('/:userId', verifyDelete, deleteAdministrator)
  .patch('/role/:userId', isAdmin, changeRole)
  .patch('/suspend/:userId', isAdmin, patchSupendUser)
  .put('/assignLocal', isAdmin, putAssignLocal)
  .delete('/review/:reviewId', isAdmin, deleteReview)
  .post('/test', isSuperAdmin, usersTest);

module.exports = administratorRoute;
