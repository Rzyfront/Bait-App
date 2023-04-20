const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: [{ model: Image, attribute: ['url'], required: false }] });
    if (!user) throw new Error('Password or email incorrect');

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) throw new Error('Password or email incorrect');

    if (user.verified !== 'verified') throw new Error('Verify your email address');

    const token = jwt.sign({
      email: user.email,
      id: user.id,
      role: user.role,
      verified: user.verified,
    }, process.env.SECRET_KEY);

    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
