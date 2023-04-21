const administratorRoute = require('express').Router();
const { isSuperAdmin, isAdmin } = require('../middlewares/validateRole');
const { verifyDelete } = require('../middlewares/userMiddlewares');
const changeRole = require('../controllers/administrator/changeRole');
const deleteAdministrator = require('../controllers/administrator/deleteAdministrator');
const deleteReview = require('../controllers/administrator/deleteReview');
const getSupendedUsers = require('../controllers/administrator/getSupendedUsers');
const getUsers = require('../controllers/administrator/getUsers');
const patchReviewVerify = require('../controllers/administrator/patchReviewVerify');
const patchSupendUser = require('../controllers/administrator/patchSupendUser');
const putAssignLocal = require('../controllers/administrator/putAssignLocal');
const putCreateAdmin = require('../controllers/administrator/putCreateAdmin');
const setQueryUsers = require('../middlewares/setQueryUsers');
const usersTest = require('../helpers/usersTest');

administratorRoute
  .get('/', isAdmin, setQueryUsers, getUsers)
  .get('/page/:numPage', isAdmin, setQueryUsers, getUsers)
  .get('/', isAdmin, getSupendedUsers)
  .put('/createAdmin/:userId', isSuperAdmin, putCreateAdmin)
  .delete('/:userId', verifyDelete, deleteAdministrator)
  .patch('/review/:reviewId', isAdmin, patchReviewVerify)
  .patch('/role/:userId', isAdmin, changeRole)
  .patch('/suspend/:userId', isAdmin, patchSupendUser)
  .put('/assignLocal', isAdmin, putAssignLocal)
  .delete('/review/:reviewId', isAdmin, deleteReview)
  .post('/test', isSuperAdmin, usersTest);

module.exports = administratorRoute;
