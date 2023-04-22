const changePassword = require('./changePassword');
const deleteUser = require('./deleteUser');
const getUser = require('./getUser');
const getUserProfile = require('./getUserProfile');
const postUser = require('./postUser');
const postUserWithGoogle = require('./postUserWithGoogle');
const putInactiveUser = require('./putInactiveUser');
const putUser = require('./putUser');
const verifyUser = require('./verifyUser');

module.exports = {
  changePassword,
  deleteUser,
  getUser,
  getUserProfile,
  postUser,
  postUserWithGoogle,
  putInactiveUser,
  putUser,
  verifyUser,
};
