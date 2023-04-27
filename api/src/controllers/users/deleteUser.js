const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId);
    user.verified = 'suspended';
    await user.save();
    return res.status(201).json({ success: true });
    // Se debe validar en el front si el usuario quiere borrar definitivamente
    // o desactivar temporalmente su usuario , esta ruta borra definitivamente
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
