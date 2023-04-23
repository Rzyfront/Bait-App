const dishValidator = require('./dishValidator');
const localValidator = require('./localValidator');
const revValidator = require('./revValidator');
const setQueryLocals = require('./setQueryLocals');
const setQueryUsers = require('./setQueryUsers');
const setReviewQuery = require('./setReviewQuery');
const userExtractor = require('./userExtractor');

module.exports = {
  dishValidator,
  localValidator,
  revValidator,
  setQueryLocals,
  setQueryUsers,
  setReviewQuery,
  userExtractor,
};
