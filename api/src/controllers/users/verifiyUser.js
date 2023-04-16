const jwt = require('jsonwebtoken');
const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) throw new Error('Token not provided or invalid');

    const { id, verified } = jwt.verify(token, process.env.SECRET_KEY_2);
    if (!id || !verified) throw new Error('Token not provided or invalid');

    const userToVerify = await User.findByPk(id);
    if (!userToVerify) throw new Error('Token not provided or invalid');

    userToVerify.verified = verified;
    await userToVerify.save();

    res.status(200).send(`<h1>User verified</h1>
    <a href='http://localhost:5173/'>Inica sesión en Bait</a>
    `);
  } catch (error) {
    res.status(400).send('<h1>User not verified</h1>');
  }
};
