const { Menu } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findByPk(menuId);
    if (!menu) throw new Error('Menu not found');
    await menu.destroy();
    res.status(201).json({ success: true, message: 'Menu destroyed successfully c:' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
