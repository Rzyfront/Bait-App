const { Review, Local } = require('../../db');

module.exports = async (req, res) => {
  const {
    title, comment, verified, food, image, environment, service, qaPrice,
  } = req.body;
  const { localId } = req.params;
  try {
    const local = await Local.findByPk(localId);
    if (!local) throw new Error('Local not found');

    const newReview = await Review.create({
      title, comment, verified, food, environment, service, qaPrice,
    });
    await local.addReview(newReview.id);
    await newReview.setImage(image.id);
    await newReview.save();
    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
