const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params; // se envia por params el Id para obtener el registro a modificar
    console.log(userId);
    if(!userId){
      res.status(400).send("User Not found")
    }
    const updatedUserData = req.body; // se envia un objeto con las modificaciones desde el front

    await User.update(updatedUserData, {
      where: {
        id: userId, // actualiza el registro del usuario
      },
    });

    res.status(204).send('User Modified Correctly'); // mensaje de actualizacion exitosa
  } catch (error) {
    res.status(404).json(error.message);
  }
};
