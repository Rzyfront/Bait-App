const jwt = require('jsonwebtoken');
const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
    const token = jwt.sign({
      email: user.email,
      id: user.id,
      role: user.role,
      verified: user.verified,
    }, process.env.SECRET_KEY);

    res.json({ success: true, token });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
