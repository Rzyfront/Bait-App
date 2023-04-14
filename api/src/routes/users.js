const { Router } = require('express');

const userRoutes = Router();
const getUsers = require('../controllers/users/getUsers');
const postUser = require('../controllers/users/postUser');
const deleteUser = require('../controllers/users/deleteUser');
const modifyUser = require('../controllers/users/putUser');
const putInactiveUser = require('../controllers/users/putInactiveUser');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUsers);
userRoutes.post('/', postUser);
userRoutes.delete('/:userId', deleteUser);
userRoutes.put('/users/:userId', modifyUser);
userRoutes.put('/inactive/:userId', putInactiveUser);
module.exports = userRoutes;
