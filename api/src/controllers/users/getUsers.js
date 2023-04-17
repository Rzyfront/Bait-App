const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    // Si se quiere obtener solo un usuari@, se recibe el id por params para mostrar solo uno
    if (userId) {
      const user = await User.findByPk(userId);
      return res.status(200).json(user);
    }
    const users = await User.findAll();
    // sino lo que hace es traer todos los usuarios que esten en la DB
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
