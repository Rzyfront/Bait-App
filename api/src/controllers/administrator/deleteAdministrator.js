const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const adminDeleted = await User.findByPk(req.userId);
    await adminDeleted.destroy();
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
