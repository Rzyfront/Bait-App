const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const updateUser = await User.update({ role }, { where: { id: Number(userId) } });
    return res.status(201).json({ success: true, updateUser });
  } catch (err) {
    return res.status(400).json({ message: err.message, success: false });
  }
};
