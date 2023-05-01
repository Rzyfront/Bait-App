const changeRole = require('./changeRole');
const deleteAdministrator = require('./deleteAdministrator');
const deleteReview = require('./deleteReview');
const getAllUsers = require('./getAllUsers');
const getSupendedUsers = require('./getSupendedUsers');
const patchReviewVerify = require('./patchReviewVerify');
const patchSupendUser = require('./patchSupendUser');
const putAssignLocal = require('./putAssignLocal');
const putCreateAdmin = require('./putCreateAdmin');
const getLocalsToVerify = require('./getLocalsToVerify');

module.exports = {
  changeRole,
  deleteAdministrator,
  deleteReview,
  getAllUsers,
  patchReviewVerify,
  getSupendedUsers,
  patchSupendUser,
  putAssignLocal,
  putCreateAdmin,
  getLocalsToVerify,
};
