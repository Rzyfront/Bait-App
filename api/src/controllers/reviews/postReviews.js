const { Review, Local } = require('../../db');

module.exports = async (req, res) => {
  const {
    title, comment, food, image, environment, service, qaPrice,
  } = req.body;
  const { localId } = req.params;
  try {
    const local = await Local.findByPk(localId);
    if (!local) throw new Error('Local not found');

    const rating = (food + environment + service + qaPrice) / 4;
    const newReview = await Review.create({
      title, comment, food, environment, service, qaPrice, rating, verified: req.verified ?? 'unVeified',
    });
    await local.addReview(newReview.id);
    await newReview.setUser(req.userId);
    await newReview.setImage(image.id);
    await newReview.save();
    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
