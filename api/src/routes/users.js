const { Router } = require('express');
const { verifyPost,verifyDelete } = require("./../middlewares/userMiddlewares")
const userRoutes = Router();
const getUsers = require('../controllers/users/getUsers');
const postUser = require('../controllers/users/postUser');
const deleteUser = require('../controllers/users/deleteUser');
const modifyUser = require('../controllers/users/putUser');
const putInactiveUser = require('../controllers/users/putInactiveUser');

userRoutes.get('/', getUsers)
  .delete('/:userId', verifyDelete, deleteUser)
  .get('/:userId', getUsers)
  .post('/', verifyPost, postUser)

  .put('/:userId', modifyUser)
  .put('/inactive/:userId', putInactiveUser);

module.exports = userRoutes;
