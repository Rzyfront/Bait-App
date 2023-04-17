const { Router } = require('express');
const { verifyPost, verifyDelete } = require('../middlewares/userMiddlewares');

const userRoutes = Router();
const getUsers = require('../controllers/users/getUsers');
const postUser = require('../controllers/users/postUser');
const deleteUser = require('../controllers/users/deleteUser');
const modifyUser = require('../controllers/users/putUser');
const putInactiveUser = require('../controllers/users/putInactiveUser');
const verifiyUser = require('../controllers/users/verifyUser');
const postUserWithGoogle = require('../controllers/users/postUserWithGoogle');

userRoutes.get('/', getUsers)
  .get('/verified', verifiyUser)
  .post('/google', postUserWithGoogle)
  .get('/:userId', getUsers)
  .post('/', verifyPost, postUser)
  .delete('/:userId', verifyDelete, deleteUser)
  .put('/:userId', modifyUser)
  .put('/inactive/:userId', putInactiveUser);

module.exports = userRoutes;
