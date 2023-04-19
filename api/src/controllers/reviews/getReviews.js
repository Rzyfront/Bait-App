const { Review, Local, Image } = require('../../db');

module.exports = async (req, res) => {
  const { localId } = req.params;
  const { verified } = req.query;

  const isVerified = verified ?? true;

  try {
    const localReviews = await Local.findByPk(localId, {
      include: [{
        model: Review,
          include: [{ model: Image, attributes: ['url'] }],
          where: { verified: isVerified },
      }],
    });

    if (!localReviews) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    return res.status(200).json({ reviews: localReviews.Reviews, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error', success: false });
  }
};
