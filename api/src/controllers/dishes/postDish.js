const { Menu, Dish } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { image, ...dish } = req.dish;
    const { menuId } = req.params;

    const menu = await Menu.findByPk(menuId);
    const newDish = await Dish.create(dish);

    await menu.addDish(newDish.id);
    await newDish.setImage(image.id);

    res.status(201).json({ success: true, dish: newDish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
