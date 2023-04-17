const jwt = require('jsonwebtoken');
const { User, Image } = require('../../db');
const { sendVerificationEmail } = require('../../config/nodemailer/nodemailer-config');

module.exports = async (req, res) => {
  try {
    const {
      firstName, lastName, email, phoneNumber, photoURL, emailVerified,
    } = req.body;
    const image = await Image.create({ url: photoURL });
    const googleUser = await User.create({
      name: firstName,
      lastname: lastName,
      email,
      verified: emailVerified ? 'verified' : 'unVerified',
      phone_number: phoneNumber,
      password: process.env.GOOGLE_USERS_PASSWORD,
      isGoogleUser: true,
    });
    googleUser.setImage(image.id);

    if (emailVerified) {
      const token = jwt.sign({
        email: googleUser.email,
        id: googleUser.id,
        role: googleUser.role,
        verified: googleUser.verified,
      }, process.env.SECRET_KEY);
      return res.status(201).json({ success: true, token });
    }
    sendVerificationEmail(googleUser.id, email);
    return res.status(201).json({ success: true, message: 'Email send' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
