const { Op, fn, col } = require('sequelize');

module.exports = (req, res, next) => {
  const {
    name, location, order, page, verified, speciality, menu, ...characteristics
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
    if (order === 'ratingASC') reqOrder = [[fn('AVG', col('Reviews.rating')), 'ASC']];
    else if (order === 'ratingDESC') reqOrder = [[fn('AVG', col('Reviews.rating')), 'DESC']];
    else if (order === 'nameASC') reqOrder = [['name', 'ASC']];
    else if (order === 'nameDESC') reqOrder = [['name', 'DESC']];
  }
  if (speciality) {
    where.speciality = { [Op.iLike]: `%${speciality}%` };
  }
  if (menu) {
    req.menu = menu;
  }

  req.characteristics = characteristics;
  req.reviews = { verified: verified ?? true };
  req.order = reqOrder;
  req.where = where;
  next();
};
