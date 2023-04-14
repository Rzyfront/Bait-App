const { Review } = require('../../db');

module.exports = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByPk(reviewId, {
      attributes: ['id', 'title', 'comment', 'photoTicket', 'verified', 'food', 'service', 'environment', 'qaPrice', 'LocalId'],
      where: { verified: true },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const ratings = {
      food: review.food,
      service: review.service,
      environment: review.environment,
      qaPrice: review.qaPrice,
    };
    const filteredRatings = {};

    let totalRating = 0;
    let ratingCount = 0;

    Object.entries(ratings).forEach(([key, value]) => {
      if (value !== null) {
        filteredRatings[key] = value;
        totalRating += value;
        ratingCount += 1;
      }
    });

    const averageRating = ratingCount ? totalRating / ratingCount : null;

    const reviewWithAvgRating = { ...review.toJSON(), averageRating };

    return res.status(200).json({ review: reviewWithAvgRating, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
