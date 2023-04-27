const {
  sendRequestOdAcquisitionLocal,
} = require('../../config/nodemailer/nodemailer-config');
const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId, local } = req;
    const { localId } = req.params;
    const user = await User.findBypk(userId);
    await sendRequestOdAcquisitionLocal({
      userEmail: user.email,
      userName: user.name,
      localId,
      localName: local.name,
    });
    res.status(200).json({ success: true, message: 'Email send successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
