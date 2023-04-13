const { Review, Category } = require('../../db');

module.exports = async (req, res) => {
  const { id } = req.params;
  const {
    title, comment, photoTicket, verified, categories,
  } = req.body;
  try {
    // Retrieve existing categories associated with the review
    const existingCategories = await Review.findByPk(id, {
      include: Category,
    });

    // Update or create the categories and get their IDs
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

    // Associate the updated categories with the review
    const updReview = await Review.findByPk(id);
    await updReview.setCategories(categoryIds);

    // Remove any categories that were previously associated with the review
    const existingCategoryIds = existingCategories.Categories.map((cat) => cat.id);
    const categoriesToRemove = existingCategoryIds.filter((catId) => !categoryIds.includes(catId));
    if (categoriesToRemove.length > 0) {
      await updReview.removeCategories(categoriesToRemove);
    }

    // Update the review with the new information
    await updReview.update({
      title, comment, photoTicket, verified,
    });

    // Get the updated review object with its associated categories
    const updatedReview = await Review.findByPk(id, {
      include: Category,
    });

    return res.status(200).json({ success: true, review: updatedReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
