const { Op } = require('sequelize');
const { Local } = require('../../db');

module.exports = async (req, res) => {
  const { name } = req.query;
  try {
    const locals = await Local.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      attributes: ['name'],
    });
    const data = locals.map((el) => el.name);
    res.status(200).json({
      success: true, data,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
