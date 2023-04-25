const bcrypt = require('bcrypt');
const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.userId);

    const pass = await bcrypt.compare(oldPassword, user.password);
    if (!pass) throw new Error('Old password incorrect');

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;

    await user.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
