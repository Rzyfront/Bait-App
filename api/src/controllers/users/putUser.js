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

    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'lastname', 'age', 'location', 'phone_number', 'email'],
    });

    return res.status(201).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
