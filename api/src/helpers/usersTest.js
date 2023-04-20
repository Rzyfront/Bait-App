const { User } = require('../db');

module.exports = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(201).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
