const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    // Deberian mandar por params el id del usuario a modificar
    const { userId } = req.params;
    // Deberian mandar por body el rol a update
    const { role } = req.body;
    const updateUser = await User.update({ role }, { where: { id: userId } });
    return res.status(201).json({ success: true, updateUser });
  } catch (err) {
    return res.status(400).json({ message: err.message, success: false });
  }
};
