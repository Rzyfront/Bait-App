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
  getSupendedUsers,
  patchReviewVerify,
  patchSupendUser,
  putAssignLocal,
  putCreateAdmin,
} = require('../controllers/administrator');

administratorRoute
  .get('/', isAdmin, setQueryUsers, getAllUsers)
  .get('/page/:numPage', isAdmin, setQueryUsers, getAllUsers)
  .get('/', isAdmin, getSupendedUsers)
  .get('/reviews', isAdmin, setReviewQuery, getReviews)
  .put('/createAdmin/:userId', isSuperAdmin, putCreateAdmin)
  // .delete('/:userId', verifyDelete, deleteAdministrator)
  .patch('/review/:reviewId', isAdmin, patchReviewVerify)
  .patch('/role/:userId', isAdmin, changeRole)
  .patch('/suspend/:userId', isAdmin, patchSupendUser)
  .put('/assignLocal', isAdmin, putAssignLocal)
  .delete('/review/:reviewId', isAdmin, deleteReview)
  .post('/test', isSuperAdmin, usersTest);

module.exports = administratorRoute;
