const { Local } = require('../../db');

module.exports = async (req, res) => {
  const locals = await Local.findAll();
  res.status(200).json({ locals, success: true });
};
