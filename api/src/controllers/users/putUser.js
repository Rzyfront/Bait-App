const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req; // se envia por params el Id para obtener el registro a modificar
    const {
      name,
      lastname,
      age,
      phone_number, // eslint-disable-line camelcase
      location,
      image,
    } = req.body; // se envia un objeto con las modificaciones desde el front

    const updateUser = await User.findByPk(userId);

    updateUser.name = name;
    updateUser.lastname = lastname;
    updateUser.age = age;
    updateUser.phone_number = phone_number;// eslint-disable-line camelcase
    updateUser.location = location;
    updateUser.setImage(image.id);
    await updateUser.save();

    const user = {
      id: updateUser.id,
      name: updateUser.name,
      lastname: updateUser.lastname,
      age: updateUser.age,
      location: updateUser.location,
      phone_number: updateUser.phone_number,
      email: updateUser.email,
    };

    return res.status(201).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
