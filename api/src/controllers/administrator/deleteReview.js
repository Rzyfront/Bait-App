const { sendReviewRejected } = require('../../config/nodemailer/nodemailer-config');
const { Review, User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByPk(reviewId, {
      include: [{ model: User }],
    });
    if (!deletedReview) throw new Error('Review not found');
    deletedReview.destroy();
    await deletedReview.save();
    sendReviewRejected(deletedReview.User.email, deletedReview.comment);
    return res.status(201).json({ success: true, deletedReview });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
