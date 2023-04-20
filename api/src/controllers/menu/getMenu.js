const { Menu, Dish, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findByPk(menuId, {
      include: [
        {
          model: Dish,
          include: Image,
        }],
    });
    if (!menu) throw new Error('Menu not found');
    res.status(200).json({ success: true, menu });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
