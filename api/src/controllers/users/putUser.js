const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params; // se envia por params el Id para obtener el registro a modificar
    if (!userId) {
      return res.status(404).json({ success: false, message: 'User ID not found' });
    }
    const updatedUserData = req.body; // se envia un objeto con las modificaciones desde el front

    const updateUser = await User.update(updatedUserData, {
      where: {
        id: userId, // actualiza el registro del usuario
      },
    });

    return res.status(201).json({ success: true, local: updateUser });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
