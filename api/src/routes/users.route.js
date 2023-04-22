const userRoutes = require('express').Router();
const {
  changePassword,
  deleteUser,
  getUser,
  getUserProfile,
  postUser,
  postUserWithGoogle,
  putInactiveUser,
  putUser,
  verifyUser,
} = require('../controllers/users');
const { userExtractor } = require('../middlewares');
const { verifyPost, verifyDelete } = require('../middlewares/userMiddlewares');

userRoutes
  .get('/profile', userExtractor, getUserProfile)
  .get('/verified', verifyUser)
  .post('/google', postUserWithGoogle)
  .get('/:userId', getUser)
  .post('/', verifyPost, postUser)
  .delete('/:userId', verifyDelete, deleteUser)
  .put('/', userExtractor, putUser)
  .put('/changePassword', userExtractor, changePassword)
  .put('/inactive/:userId', putInactiveUser);

module.exports = userRoutes;
