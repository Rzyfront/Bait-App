const { Review } = require('../../db');

module.exports = async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req;
  const {
    title, comment, image, food, environment, service, qaPrice,
  } = req.body;
  try {
    const updReview = await Review.findByPk(reviewId);
    if (userId !== updReview.UserId) throw new Error('The user is not the reviewer');
    const rating = (food + environment + service + qaPrice) / 4;
    // Update the review with the new information
    await updReview.update({
      title, comment, food, environment, service, qaPrice, rating,
    });
    await updReview.setImage(image.id);
    return res.status(200).json({ success: true, review: updReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
