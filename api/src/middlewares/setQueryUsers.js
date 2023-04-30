const { Op } = require('sequelize');

module.exports = (req, res, next) => {
  const { email, verified, role } = req.query;
  const where = {};
  const review = {};
  if (verified) review.verified = verified;
  if (email) {
    where.email = { [Op.iLike]: `%${email}%` };
  }
  if (role) where.role = role;
  req.where = where;
  req.review = review;
  next();
};
