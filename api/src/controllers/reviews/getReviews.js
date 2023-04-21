const { Review, Image, User } = require('../../db');

module.exports = async (req, res) => {
  const { localId } = req.params;
  const { verified, page } = req.query;
  const pages = page ?? 1;
  const isVerified = verified ?? 'verified';

  try {
    const { count, rows } = await Review.findAndCountAll({
      where: {
        LocalId: localId,
        verified: isVerified,
      },
      include: [{
        model: User,
        attributes: ['name', 'lastname', 'id'],
        include: [{ model: Image, attributes: ['url'] }],
      }, { model: Image, attributes: ['url'] }],
      limit: 10,
      offset: (pages - 1) * 10,
    });

    // if (!localReviews.length) throw new Error('Not found');

    const totalPages = Math.ceil(count / 10);
    return res.status(200).json({
      totalPages, count, success: true, reviews: rows,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};
