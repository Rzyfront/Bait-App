const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../db');

module.exports = async (req, res) => {
  const {
    name,
    lastname,
    age,
    phone_number,
    email,
    location,
    password,
  } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      lastname,
      age,
      phone_number,
      email,
      location,
      password: passwordHash,
    });
    const token = jwt.sign({ email: newUser.email, id: newUser.id }, process.env.SECRET_KEY);
    res
      .status(201)
      .json({ newUser, token });
  } catch (error) {
    res.status(404).json(`Failed to create user:  ${error.message}`);
  }
};
