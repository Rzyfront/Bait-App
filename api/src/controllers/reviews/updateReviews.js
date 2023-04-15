const { Review } = require('../../db');

module.exports = async (req, res) => {
  const { reviewId } = req.params;
  const {
    title, comment, image, verified, food, environment, service, qaPrice,
  } = req.body;
  try {
    const updReview = await Review.findByPk(reviewId);

    // Update the review with the new information
    await updReview.update({
      title, comment, verified, food, environment, service, qaPrice,
    });
    await updReview.setImage(image.id);
    return res.status(200).json({ success: true, review: updReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
