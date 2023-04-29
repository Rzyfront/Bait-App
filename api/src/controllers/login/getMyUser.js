const { User, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [{ model: Image, attribute: ['url'] }],
    });
    if (!user) throw new Error('User not found');
    if (user.verified === 'suspended') throw new Error('Your account has been suspended');
    if (user.role !== req.role) throw new Error('Your role has been modified, please login again');
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
