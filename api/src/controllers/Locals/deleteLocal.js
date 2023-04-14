const { Local } = require('../../db');

module.exports = async (req, res) => {
  try {
    const localDeleted = await Local.findByPk(req.local.id);
    await localDeleted.destroy();
    return res.status(201).json({ success: true, localDeleted });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
