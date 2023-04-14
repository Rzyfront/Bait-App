const { Dish } = require('../../db');

module.exports = async (req, res) => {
  try {
    const {
      name, type, ingredients, price, description,
    } = req.body;
    const { dishId } = req.params;
    const updateDish = await Dish.findByPk(dishId);
    updateDish.price = price;
    updateDish.name = name;
    updateDish.type = type;
    updateDish.ingredients = ingredients;
    updateDish.description = description;
    await updateDish.save();
    res.status(201).json({ success: true, dish: updateDish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
