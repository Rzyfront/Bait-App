const { Router } = require('express');
const { verifyPost, verifyDelete } = require('../middlewares/userMiddlewares');

const userRoutes = Router();
const getUser = require('../controllers/users/getUser');
const postUser = require('../controllers/users/postUser');
const deleteUser = require('../controllers/users/deleteUser');
const modifyUser = require('../controllers/users/putUser');
const putInactiveUser = require('../controllers/users/putInactiveUser');
const verifiyUser = require('../controllers/users/verifyUser');
const postUserWithGoogle = require('../controllers/users/postUserWithGoogle');
const patchSupendUser = require('../controllers/users/patchSupendUser');
const userExtractor = require('../middlewares/userExtractor');
const { isAdmin } = require('../middlewares/validateRole');

userRoutes
  .get('/verified', verifiyUser)
  .post('/google', postUserWithGoogle)
  .get('/:userId', getUser)
  .post('/', verifyPost, postUser)
  .delete('/:userId', verifyDelete, deleteUser)
  .put('/:userId', modifyUser)
  .put('/inactive/:userId', putInactiveUser)
  .patch('/suspend/:userId', userExtractor, isAdmin, patchSupendUser);

module.exports = userRoutes;
