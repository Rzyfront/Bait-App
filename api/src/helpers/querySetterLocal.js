const { Op } = require('sequelize');

const setQueryName = (queryName) => ({
  [Op.or]:
        {
          [Op.iLike]: queryName,
          [Op.like]: queryName,
          [Op.startsWith]: queryName,
          [Op.substring]: queryName,
          [Op.endsWith]: queryName,
        },
});
const setQueryLocation = (queryLocation) => ({
  [Op.or]:
        {
          [Op.iLike]: queryLocation,
          [Op.like]: queryLocation,
          [Op.startsWith]: queryLocation,
          [Op.substring]: queryLocation,
          [Op.endsWith]: queryLocation,
        },
});

module.exports = { setQueryName, setQueryLocation };
