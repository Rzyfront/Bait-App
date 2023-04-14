const { Local, Menu } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { localId } = req.params;
    const local = await Local.findByPk(localId);
    if (!local) throw new Error('Local not found');
    const newMenu = await Menu.create({});
    await local.setMenu(newMenu.id);
    res.status(201).json({ success: true, local });
  } catch (error) {
    res.status(400).json({ succes: false, message: error.message });
  }
};
