const { Menu, Dish } = require('../../db');

module.exports = async (req, res) => {
  try {
    const {
      name, type, ingredients, price, description,
    } = req.body;
    const { menuId } = req.params;
    const menu = await Menu.findByPk(menuId);
    const newDish = await Dish.create({
      name, type, ingredients, price, description,
    });
    await menu.addDish(newDish.id);
    res.status(201).json({ success: true, dish: newDish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
