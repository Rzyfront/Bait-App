const { Review } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.destroy({
      where: {
        id: reviewId,
      },
    });
    if (deletedReview === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(204).json({ message: 'Review successfully deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
