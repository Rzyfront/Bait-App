const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    user.role = 'admin';
    await user.save();
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message, success: false });
  }
};
