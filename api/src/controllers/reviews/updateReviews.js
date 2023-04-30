const { Review } = require('../../db');

module.exports = async (req, res) => {
  const { reviewId } = req.params;
  const { userId, toxicity } = req;
  const {
    title, comment, image, food, environment, service, qaPrice, ticket,
  } = req.body;
  try {
    const updReview = await Review.findByPk(reviewId);
    if (userId !== updReview.UserId) throw new Error('The user is not the reviewer');
    if (updReview.verified === 'archived') throw new Error('Cannot modify an archived review');
    const rating = (food + environment + service + qaPrice) / 4;
    // Update the review with the new information
    await updReview.update({
      title, comment, food, environment, service, qaPrice, rating, verified: 'unVerified', toxicity,
    });
    await updReview.setImage(image.id);
    await updReview.setTicket(ticket.id);
    return res.status(200).json({ success: true, review: updReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
