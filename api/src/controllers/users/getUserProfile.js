const {
  User, Image, Review, Local,
} = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'lastname', 'age', 'location', 'phone_number', 'email'],
      include: [
        { model: Image, attributes: ['url'] },
        { model: Review, include: [{ model: Image, attributes: ['url'] }] },
        {
          model: Local,
          where: { verified: 'verified' },
          required: false,
        },
      ],
    });
    if (!user) throw Error('User not found');
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
