const { Dish } = require('../../db');

module.exports = async (req, res) => {
  try {
    const {
      name, type, price, description, image,
    } = req.dish;
    const { dishId } = req.params;
    const updateDish = await Dish.findByPk(dishId);
    updateDish.price = price;
    updateDish.name = name;
    updateDish.type = type;
    updateDish.description = description;
    updateDish.setImage(image.id);
    await updateDish.save();
    res.status(201).json({ success: true, dish: updateDish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
