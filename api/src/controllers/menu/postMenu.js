const { Local, Menu } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { localId } = req.params;
    const { type } = req.body;
    const local = await Local.findByPk(localId);
    if (!local) throw new Error('Local not found');
    const newMenu = await Menu.create({ type });
    await local.addMenu(newMenu.id);
    res.status(201).json({ success: true, local });
  } catch (error) {
    res.status(400).json({ succes: false, message: error.message });
  }
};
