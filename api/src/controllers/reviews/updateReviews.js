const { Review } = require('../../db');

module.exports = async (req, res) => {
  const { reviewId } = req.params;
  const {
    title, comment, photoTicket, verified, food, environment, service, qaPrice,
  } = req.body;
  try {
    // Associate the updated categories with the review
    const updReview = await Review.findByPk(reviewId);

    // Update the review with the new information
    await updReview.update({
      title, comment, photoTicket, verified, food, environment, service, qaPrice,
    });

    return res.status(200).json({ success: true, review: updReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
