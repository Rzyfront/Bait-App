const { Review, Local } = require('../../db');

module.exports = async (req, res) => {
  const {
    title, comment, photoTicket, verified, food, environment, service, qaPrice,
  } = req.body;
  const { localId } = req.params;
  try {
    const local = await Local.findByPk(localId);
    if (!local) throw new Error('Local not found');
    // Create the new review and associate the categories
    const newReview = await Review.create({
      title, comment, photoTicket, verified, food, environment, service, qaPrice,
    });
    await local.addReview(newReview.id);
    await newReview.save();
    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
