const bcrypt = require('bcrypt');
const { User } = require('../../db');
const { sendVerificationEmail } = require('../../config/nodemailer/nodemailer-config');

module.exports = async (req, res) => {
  const {
    name,
    lastname,
    age,
    phoneNumber,
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
      phone_number: phoneNumber,
      email,
      location,
      password: passwordHash,
    });
    sendVerificationEmail(newUser.id, newUser.email);
    res
      .status(201)
      .json({ success: true, message: 'Email send' });
  } catch (error) {
    res.status(404).json({ message: `Failed to create user:  ${error.message}`, success: false });
  }
};
