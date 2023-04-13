const { Review } = require('../../db');

module.exports = async (req, res) => {
  const reviews = await Review.findAll();
  res.status(200).json({ reviews, success: true });
};
