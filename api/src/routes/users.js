const userRoutes = require('express').Router();
const { verifyPost, verifyDelete } = require('../middlewares/userMiddlewares');

const deleteUser = require('../controllers/users/deleteUser');
const getUser = require('../controllers/users/getUser');
const getUserProfile = require('../controllers/users/getUserProfile');
const modifyUser = require('../controllers/users/putUser');
const postUser = require('../controllers/users/postUser');
const postUserWithGoogle = require('../controllers/users/postUserWithGoogle');
const putInactiveUser = require('../controllers/users/putInactiveUser');
const userExtractor = require('../middlewares/userExtractor');
const verifiyUser = require('../controllers/users/verifyUser');
const changePassword = require('../controllers/users/changePassword');

userRoutes
  .get('/profile', userExtractor, getUserProfile)
  .get('/verified', verifiyUser)
  .post('/google', postUserWithGoogle)
  .get('/:userId', getUser)
  .post('/', verifyPost, postUser)
  .delete('/:userId', verifyDelete, deleteUser)
  .put('/', userExtractor, modifyUser)
  .put('/changePassword', userExtractor, changePassword)
  .put('/inactive/:userId', putInactiveUser);

module.exports = userRoutes;
