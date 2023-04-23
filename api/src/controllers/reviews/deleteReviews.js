const { Review } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByPk(reviewId);
    if (!deletedReview) throw new Error('Review not found');
    if (req.userId !== deletedReview.UserId) {
      throw new Error(
        'Only the user who made the review or an admin can delete reviews',
      );
    }
    deletedReview.destroy();
    await deletedReview.save();
    return res.status(201).json({ success: true, deletedReview });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
