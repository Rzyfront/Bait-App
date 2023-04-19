const { User, Image, Review } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { where } = req;
    const user = await User.findAll({
      where: where.email ?? {},
      include: [
        { model: Image, attributes: ['url'] },
        {
          model: Review,
          where: where.verified ?? {},
          required: false,
        },
      ],
    });
    if (!user) throw new Error('User not found');
    return res.status(200).json({ user, success: true });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
