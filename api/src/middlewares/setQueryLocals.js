const { Op, fn, col } = require('sequelize');

module.exports = (req, res, next) => {
  const {
    name, location, order, verified, specialty, menu, ...characteristics
  } = req.query;
  const where = {};
  let reqOrder = [];
  req.menu = {};
  if (name) {
    where.name = { [Op.iLike]: `%${name}%` };
  }
  if (location) {
    where.location = { [Op.iLike]: `%${location}%` };
  }
  if (order) {
    if (order === 'ratingASC') reqOrder = [[fn('AVG', col('Reviews.rating')), 'ASC']];
    else if (order === 'ratingDESC') reqOrder = [[fn('AVG', col('Reviews.rating')), 'DESC']];
    // else if (order === 'nameASC') reqOrder = [['name', 'ASC']];
    // else if (order === 'nameDESC') reqOrder = [['name', 'DESC']];
    req.requireReviews = true;
  }
  if (specialty) {
    where.specialty = { [Op.iLike]: `%${specialty}%` };
  }
  if (menu) {
    req.menu = { type: menu };
  }
  where.verified = verified ?? {
    [Op.or]: ['verified', 'unVerified'],
  };

  if (typeof characteristics.characteristics === 'string') req.characteristics = JSON.parse(characteristics.characteristics);
  else req.characteristics = characteristics;
  req.order = reqOrder;
  req.where = where;
  next();
};
