const { fn, col } = require('sequelize');
const { Local } = require('../../db');

module.exports = async (req, res) => {
  try {
    const allSpecialties = await Local.findAll({
      attributes: [[fn('DISTINCT', col('specialty')), 'specialty']],
    });
    res.status(200).json({ suceess: true, allSpecialties });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
