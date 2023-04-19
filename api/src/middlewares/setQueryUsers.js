const { Op } = require('sequelize');

module.exports = (req, res, next) => {
  const { email, verified } = req.query;
  const where = {};
  if (verified === 'f') {
    where.verified = { verified: false };
  }
  if (verified === 't') {
    where.verified = { verified: true };
  }
  if (email) {
    where.email = { [Op.iLike]: `%${email}%` };
  }
  req.where = where;
  next();
};
