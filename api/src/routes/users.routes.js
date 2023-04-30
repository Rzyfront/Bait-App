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
const { verifyPost } = require('../middlewares/userMiddlewares');

userRoutes
  .get('/profile', userExtractor, getUserProfile)
  .get('/verified', verifyUser)
  .get('/:userId', getUser)
  .post('/google', postUserWithGoogle)
  .post('/', verifyPost, postUser)
  .delete('/:userId', userExtractor, deleteUser)
  .put('/', userExtractor, putUser)
  .put('/changePassword', userExtractor, changePassword)
  .put('/inactive/:userId', putInactiveUser);

module.exports = userRoutes;
