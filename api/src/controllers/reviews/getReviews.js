const { Review, Local } = require('../../db');

module.exports = async (req, res) => {
  const { localId } = req.params;

  try {
    const localReviews = await Local.findByPk(localId, {

      include: {
        model: Review,
        where: { verified: true },
      },
    });

    if (!localReviews) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    // const ratings = {
    //   food: review.food,
    //   service: review.service,
    //   environment: review.environment,
    //   qaPrice: review.qaPrice,
    // };
    // const filteredRatings = {};

    // let totalRating = 0;
    // let ratingCount = 0;

    // Object.entries(ratings).forEach(([key, value]) => {
    //   if (value !== null || value > 0) {
    //     filteredRatings[key] = value;
    //     totalRating += value;
    //     ratingCount += 1;
    //   }
    // });

    // const averageRating = ratingCount ? totalRating / ratingCount : null;

    // const reviewWithAvgRating = { ...review.toJSON(), averageRating };

    return res.status(200).json({ reviews: localReviews.Reviews, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error', success: false });
  }
};
