const { Review } = require('../../db');

module.exports = async (req, res) => {
  const {
    title, comment, photoTicket, verified, food, environment, service, qaPrice,
  } = req.body;
  try {
    // Create the new review and associate the categories
    const newReview = await Review.create({
      title, comment, photoTicket, verified, food, environment, service, qaPrice,
    });

    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
