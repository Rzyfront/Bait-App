// const { Op } = require('sequelize');
const { setQueryName, setQueryLocation } = require('../../helpers/querySetterLocal');

module.exports = (req, res, next) => {
  const { name, location, ...characteristics } = req.query; // eslint-disable-line
  const where = {};
  if (name) {
    where.name = setQueryName(name);
  }
  if (location) {
    where.location = setQueryLocation(location);
  }
  req.characteristics = characteristics;
  req.where = where;
  next();
};
