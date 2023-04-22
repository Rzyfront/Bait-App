const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(404).json({ success: false, message: 'User ID not found' });
    }
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User ID not found' });
    }
    const updateUser = await user.update({ isActive: false });
    const userData = {
      id: updateUser.id,
      isActive: updateUser.isActive,
    };
    return res.status(201).json({ success: true, user: userData });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
