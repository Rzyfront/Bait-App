const { Dish } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { dishId } = req.params;
    const deleteDish = await Dish.findByPk(dishId);
    if (!deleteDish) throw new Error('Dish not found');
    deleteDish.destroy();
    res.status(201).json({ success: true, dish: deleteDish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
