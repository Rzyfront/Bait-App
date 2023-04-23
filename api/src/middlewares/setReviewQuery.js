module.exports = (req, res, next) => {
  const { localId } = req.params;
  const { verified } = req.query;
  req.where = {};
  if (localId)req.where.LocalId = localId;
  req.where.verified = verified ?? 'verified';
  next();
};
