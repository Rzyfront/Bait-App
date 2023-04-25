const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'lastname', 'age', 'location', 'verified'],
      where: {
        verified: 'suspended',
      },
    });
    return res.status(200).json({ users, success: true });
  } catch (err) {
    return res.status(404).json({ message: err.message, success: false });
  }
};
