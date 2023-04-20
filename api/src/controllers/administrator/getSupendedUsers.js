const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const administrators = await User.findAll({
      where: {
        verified: 'suspended',
      },
    });
    return res.status(200).json({ administrators, success: true });
  } catch (err) {
    return res.status(404).json({ message: err.message, success: false });
  }
};
