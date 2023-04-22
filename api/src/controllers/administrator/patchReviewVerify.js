const { Review } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { verified } = req.query;
    const review = await Review.findByPk(reviewId);
    if (!review) throw new Error('Review not Found');
    review.verified = verified ?? 'verified';
    await review.save();
    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
