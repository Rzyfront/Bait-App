const { Review } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByPk(reviewId);
    if (!deletedReview) throw new Error('Review not found');
    deletedReview.destroy();
    deletedReview.save();
    return res.status(201).json({ success: true, deletedReview });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
