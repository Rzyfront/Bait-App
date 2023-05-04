const { User, Image, Review } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const { verified } = req.query;
    const user = await User.findByPk(userId, {
      include: [
        { model: Image, attributes: ['url'] },
        {
          model: Review,
          where: { verified: verified ?? 'verified' },
          required: false,
        },
      ],
    });
    if (!user) throw new Error('Usuario no encontrado');
    return res.status(200).json({ user, success: true });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
