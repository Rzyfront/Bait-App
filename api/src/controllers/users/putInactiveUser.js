const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(404).send({ message: 'Usuario no encontrado' });
      return;
    }
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).send({ message: 'Usuario no encontrado' });
    } else {
      await user.update({ isActive: false });
      res.status(200).send({ message: 'Usuario desactivado correctamente' });
    }
  } catch (error) {
    res.status(400).send({ message: `Error al desactivar el usuario, ${error.message}` });
  }
};
