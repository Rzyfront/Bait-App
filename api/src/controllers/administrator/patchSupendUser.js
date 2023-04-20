const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const userToSupend = await User.findByPk(userId);
    userToSupend.verified = 'suspended';
    await userToSupend.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
