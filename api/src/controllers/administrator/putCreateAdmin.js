// Importa el mode de usuario de la base de datos
const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    // saca  el userId  del parametro de la solitud (req)
    const { userId } = req.params;
    // buca el usuario en la base de datos utilizando su clave primaria
    const user = await User.findByPk(userId);
    // si el usuario no se encuentra lanza un error
    if (!user) throw new Error('User not found');
    // si el usuario se encuentra cambia su rol a  administrador
    user.role = 'admin';

    // guarda los cambios en la base de datos
    await user.save();
    // Devuelve una respuesta con el estado 201 (Created)
    // y un objeto JSON con la propiedad success en true
    return res.status(201).json({ success: true });
  } catch (err) {
    // Si hay un error, devuelve una respuesta con el estado 400 (Bad Request)
    // y un objeto JSON con el
    // mensaje de error y la propiedad success en false
    return res.status(400).json({ message: err.message, success: false });
  }
};
