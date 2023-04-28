const { Menu, Dish, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { dishId } = req.params;
    const dish = await Dish.findByPk(dishId, {
      include: [
        { model: Menu },
        { model: Image },
      ],
    });

    res.status(201).json({ success: true, dish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
