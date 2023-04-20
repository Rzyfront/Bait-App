const {
  User, Image, Review, Local,
} = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      include: [
        { model: Image, attributes: ['url'] },
        { model: Review, include: [{ model: Image, attributes: ['url'] }] },
        { model: Local },
      ],
    });
    if (!user) throw Error('User not found');
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};