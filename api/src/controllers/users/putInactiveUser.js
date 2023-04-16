const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(404).send({ message: 'User ID not found' });
      return;
    }
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).send({ message: 'User Not found' });
    } else {
      await user.update({ isActive: false });
      res.status(200).send({ message:`User ${userId} deactivared succesfully`});
    }
  } catch (error) {
    res.status(400).send({ message: `Error deactivaring the user  ${error.message}` });
  }
};
