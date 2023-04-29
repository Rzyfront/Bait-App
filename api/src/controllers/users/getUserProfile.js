const {
  User, Image, Review, Local,
} = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const ID = userId ?? req.userId;
    const user = await User.findByPk(ID, {
      attributes: ['id', 'name', 'lastname', 'age', 'location', 'phone_number', 'email'],
      include: [
        { model: Image, attributes: ['url'] },
        {
          model: Review,
          include: [
            { model: Image, attributes: ['url'], as: 'Image' },
            { model: Image, attributes: ['url'], as: 'ticket' },
          ],
        },
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
