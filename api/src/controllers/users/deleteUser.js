const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    await User.destroy({ where: { id: userId } });

    return res.status(201).json({ success: true });
    // Se debe validar en el front si el usuario quiere borrar definitivamente
    // o desactivar temporalmente su usuario , esta ruta borra definitivamente
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
