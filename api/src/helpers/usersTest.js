const bcrypt = require('bcrypt');
const { User } = require('../db');

module.exports = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ ...req.body, password: passwordHash });
    res.status(201).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
