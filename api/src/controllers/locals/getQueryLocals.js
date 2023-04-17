const { Op, fn, col } = require('sequelize');

module.exports = (req, res, next) => {
  const {
    name, location, order, page, ...characteristics
  } = req.query;
  const where = {};
  let reqOrder = [];
  if (name) {
    where.name = { [Op.iLike]: `%${name}%` };
  }
  if (location) {
    where.location = { [Op.iLike]: `%${location}%` };
  }
  if (order) {
    if (order === 'ASC') reqOrder = [[fn('AVG', col('Reviews.rating')), 'ASC']];
    else if (order === 'DESC') reqOrder = [[fn('AVG', col('Reviews.rating')), 'DESC']];
  }
  req.characteristics = characteristics;
  req.order = reqOrder;
  req.where = where;
  next();
};
