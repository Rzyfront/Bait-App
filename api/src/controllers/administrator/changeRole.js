const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    if (!role) throw new Error('Need a role to update');
    if (role === 'admin') throw new Error('You cannot change the role to admin, contact a superAdmin');

    const updateUser = await User.findByPk(userId);
    if (!updateUser) throw new Error('User not found');
    updateUser.role = role;
    await updateUser.save();
    const user = {
      id: updateUser.id,
      role: updateUser.role,
      verified: updateUser.verified,
    };
    return res.status(201).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ message: err.message, success: false });
  }
};
