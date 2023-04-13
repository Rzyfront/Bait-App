const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    // Deberian mandar por params el id del usuario a modificar
    const { userId } = req.params;
    // Deberian mandar por body el rol a update
    const { role } = req.body;
    const userToChangeRole = await User.update({ role }, { where: { id: userId } });
    return res.status(200).send(userToChangeRole);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
