const { Dish, Image } = require('../../db');

module.exports = async (req, res) => {
  const { dishId } = req.params;
  try {
    const dish = await Dish.findByPk(dishId, {
      include: [
        { model: Image },
      ],
    });
    res.status(200).json({ success: true, dish });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
