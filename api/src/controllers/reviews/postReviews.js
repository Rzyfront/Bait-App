const { Review, Category } = require('../../db');

module.exports = async (req, res) => {
  const {
    title, comment, photoTicket, verified, categories,
  } = req.body;
  try {
    // Create or update the categories and get their IDs
    const categoryIds = await Promise.all(
      categories.map(async ({ name, score }) => {
        const [category, created] = await Category.findOrCreate({
          where: { name },
          defaults: { score },
        });
        if (!created) {
          await category.update({ score });
        }
        return category.id;
      }),
    );

    // Create the new review and associate the categories
    const newReview = await Review.create({
      title, comment, photoTicket, verified,
    });
    await newReview.addCategories(categoryIds);

    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
