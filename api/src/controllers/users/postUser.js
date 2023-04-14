const { User } = require('../../db');

module.exports = async (req, res) => {
  const {
    name, lastname, age, phone_number, email, location, verified,isActive
  } = req.body;

  try {
    const newUser = await User.create({
      name, lastname, age, phone_number, email, location, verified,isActive:true
    });

    res.status(201).json(`User created correctly ${newUser.name} ${newUser.lastname}`);
  } catch (error) {
    res.status(404).json(`Failed to create user  ${error.message}`);
  }
};
