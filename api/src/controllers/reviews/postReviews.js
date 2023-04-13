const { Review } = require('../../db');

module.exports = async (req, res) => {
  const {
    title, comment, photoTicket, verified,
  } = req.body;
  try {
    const newReview = await Review.create({
      title, comment, photoTicket, verified,
    });
    return res.status(201).json({ success: true, local: newReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
