const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const administrators = await User.findAll({
      where: {
        rol: 'admi',
      },
    });
    return res.status(200).json({ administrators, success: true });
  } catch (err) {
    return res.status(404).send(err.message);
  }
};
