const { Review } = require('../../db');

module.exports = async (req, res) => {
  const reviews = await Review.findAll({
    attributes: ['id', 'title', 'comment', 'photoTicket', 'verified', 'food', 'service', 'environment', 'qaPrice', 'LocalId'],
    where: { verified: true },
  });

  const reviewData = reviews.map((review) => {
    const {
      id, title, comment, photoTicket, verified, food, service, environment, qaPrice, LocalId,
    } = review;
    const ratings = {
      food, service, environment, qaPrice,
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

    return {
      id,
      title,
      comment,
      photoTicket,
      verified,
      LocalId,
      ratings: filteredRatings,
      averageRating,
    };
  });

  res.status(200).json({ reviews: reviewData, success: true });
};
