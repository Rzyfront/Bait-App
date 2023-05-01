/* eslint-disable max-len */
const administratorRoute = require('express').Router();
const { isSuperAdmin, isAdmin } = require('../middlewares/validateRole');
// const { verifyDelete } = require('../middlewares/userMiddlewares');

const usersTest = require('../helpers/usersTest');

const { setQueryUsers, setReviewQuery } = require('../middlewares');

const { getReviews } = require('../controllers/reviews');
const {
  changeRole,
  // deleteAdministrator,
  deleteReview,
  getAllUsers,
  // getSupendedUsers,
  patchReviewVerify,
  patchSupendUser,
  putAssignLocal,
  putCreateAdmin,
  getLocalsToVerify,
} = require('../controllers/administrator');
const { getUserProfile } = require('../controllers/users');

administratorRoute
  .get('/', isAdmin, setQueryUsers, getAllUsers)
  .get('/page/:numPage', isAdmin, setQueryUsers, getAllUsers)
  .get('/toVerify', isAdmin, getLocalsToVerify)
  // .get('/', isAdmin, getSupendedUsers)
  .get('/reviews', isAdmin, setReviewQuery, getReviews)
  .get('/:userId', isAdmin, getUserProfile)
  .put('/createAdmin/:userId', isSuperAdmin, putCreateAdmin)
  .patch('/review/:reviewId', isAdmin, patchReviewVerify)
  .patch('/role/:userId', isAdmin, changeRole)
  .patch('/suspend/:userId', isAdmin, patchSupendUser)
  .put('/assignLocal', isAdmin, putAssignLocal)
  .delete('/review/:reviewId', isAdmin, deleteReview)
  .post('/test', isSuperAdmin, usersTest);

module.exports = administratorRoute;
