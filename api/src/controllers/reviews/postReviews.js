const { Review, Category } = require('../../db');

module.exports = async (req, res) => {
  const {
    title, comment, photoTicket, verified, categories,
  } = req.body;
  try {
    const newCats = await Category.bulkCreate(categories);
    const newReview = await Review.create({
      title, comment, photoTicket, verified,
    });
    newReview.addCategories(newCats.map((cat) => cat.id));

    return res.status(201).json({ success: true, local: newReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
