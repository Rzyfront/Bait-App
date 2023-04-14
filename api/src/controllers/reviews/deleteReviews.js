const { Review } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByPk(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    deletedReview.destroy();
    deletedReview.save();
    return res.status(204).json({ message: 'Review successfully deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
