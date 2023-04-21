const administratorRoute = require('express').Router();
const { isSuperAdmin, isAdmin } = require('../middlewares/validateRole');
const { verifyDelete } = require('../middlewares/userMiddlewares');
const changeRole = require('../controllers/administrator/changeRole');
const deleteAdministrator = require('../controllers/administrator/deleteAdministrator');
const deleteReview = require('../controllers/administrator/deleteReview');
const getSupendedUsers = require('../controllers/administrator/getSupendedUsers');
const getAllUsers = require('../controllers/administrator/getAllUsers');
const patchReviewVerify = require('../controllers/administrator/patchReviewVerify');
const patchSupendUser = require('../controllers/administrator/patchSupendUser');
const putAssignLocal = require('../controllers/administrator/putAssignLocal');
const putCreateAdmin = require('../controllers/administrator/putCreateAdmin');
const setQueryUsers = require('../middlewares/setQueryUsers');
const usersTest = require('../helpers/usersTest');
const getReviews = require('../controllers/reviews/getReviews');
const setReviewQuery = require('../middlewares/setReviewQuery');

administratorRoute
  .get('/', isAdmin, setQueryUsers, getAllUsers)
  .get('/page/:numPage', isAdmin, setQueryUsers, getAllUsers)
  .get('/', isAdmin, getSupendedUsers)
  .get('/reviews', isAdmin, setReviewQuery, getReviews)
  .put('/createAdmin/:userId', isSuperAdmin, putCreateAdmin)
  .delete('/:userId', verifyDelete, deleteAdministrator)
  .patch('/review/:reviewId', isAdmin, patchReviewVerify)
  .patch('/role/:userId', isAdmin, changeRole)
  .patch('/suspend/:userId', isAdmin, patchSupendUser)
  .put('/assignLocal', isAdmin, putAssignLocal)
  .delete('/review/:reviewId', isAdmin, deleteReview)
  .post('/test', isSuperAdmin, usersTest);

module.exports = administratorRoute;
