const { Menu, Local } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { type } = req.body;
    const { localId } = req.params;

    const local = await Local.findByPk(localId);
    const newMenu = await Menu.create({ type });
    await local.addMenu(newMenu.id);
    res.status(201).json({ success: true, local, menu: newMenu });
  } catch (error) {
    res.status(400).json({ succes: false, message: error.message });
  }
};
