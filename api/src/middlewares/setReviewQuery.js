module.exports = (req, res, next) => {
  const { localId } = req.params;
  const { verified, page } = req.query;
  req.where = {};
  if (localId)req.where.LocalId = localId;
  req.where.verified = verified ?? 'verified';
  req.page = page || 1;
  next();
};
