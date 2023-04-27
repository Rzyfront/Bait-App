const {
  sendRequestForOwnership,
} = require('../../config/nodemailer/nodemailer-config');
const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId);
    await sendRequestForOwnership({
      userEmail: user.email,
      userName: user.name,
      userId,
    });
    res.status(200).json({ success: true, message: 'Email successfully sent' });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
