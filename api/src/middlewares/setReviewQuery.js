module.exports = (req, res, next) => {
  const { localId } = req.params;
  const { verified, page, order } = req.query;
  req.where = {};
  req.order = [];
  if (localId)req.where.LocalId = localId;
  if (order) {
    if (order === 'ASC') req.order = [['rating', 'ASC']];
    else req.order = [['rating', 'DESC']];
  }
  req.where.verified = verified ?? 'verified';
  req.page = page || 1;
  next();
};
