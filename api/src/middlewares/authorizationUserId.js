const { Review } = require('../db');

const isLocalOwner = (req, res, next) => {
  if (req.local.UserId === req.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Sin autorización', success: false });
};

const isProfileUser = (req, res, next) => {
  const { userId } = req.params;
  if (userId === req.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Sin autorización', success: false });
};

const isWriterReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const reviewer = await Review.findByPk(reviewId);
  if (reviewer.UserId === req.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Sin autorización', success: false });
};

// FALTA MENU Y DISH

module.exports = { isLocalOwner, isProfileUser, isWriterReview };
