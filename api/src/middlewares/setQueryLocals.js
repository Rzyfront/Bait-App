const { Op, fn, col } = require('sequelize');

module.exports = (req, res, next) => {
  const {
    name, location, order, page, verified, specialty, menu, ...characteristics
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
    else if (order === 'nameASC') reqOrder = [['name', 'ASC']];
    else if (order === 'nameDESC') reqOrder = [['name', 'DESC']];
  }
  if (specialty) {
    where.specialty = { [Op.iLike]: `%${specialty}%` };
  }
  if (menu) {
    req.menu = { type: menu };
  }

  req.characteristics = JSON.parse(characteristics);
  req.reviews = { verified: verified ?? 'verified' };
  req.order = reqOrder;
  req.where = where;
  next();
};
