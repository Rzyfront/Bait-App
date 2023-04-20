const { User, Local } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId, localId } = req.body;
    const local = await Local.findByPk(localId);
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    if (user.role !== 'owner') throw new Error('User is not an owner');
    if (!local) throw new Error('Local not found');
    await local.setUser(user.id);
    local.verified = 'verified';
    await local.save();
    res.status(201).json({ success: true, local });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};