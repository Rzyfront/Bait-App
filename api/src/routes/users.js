const { Router } = require('express');

const userRoutes = Router();
const getUsers = require('../controllers/users/getUsers');
const postUser = require('../controllers/users/postUser');
const deleteUser = require('../controllers/users/deleteUser');
const modifyUser = require('../controllers/users/putUser');
const putInactiveUser = require('../controllers/users/putInactiveUser');
const verifiyUser = require('../controllers/users/verifiyUser');

userRoutes.get('/', getUsers)
  .get('/verified', verifiyUser)
  .get('/:userId', getUsers)
  .post('/', postUser)
  .delete('/:userId', deleteUser)
  .put('/:userId', modifyUser)
  .put('/inactive/:userId', putInactiveUser);

module.exports = userRoutes;
