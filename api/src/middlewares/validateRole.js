const isAdmin = (req, res, next) => {
  const { role } = req;
  if (role === 'admin' || role === 'superAdmin') {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized', success: false });
};

const isSuperAdmin = (req, res, next) => {
  const { role } = req;
  if (role === 'superAdmin') {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized', success: false });
};

const isOwner = (req, res, next) => {
  const { role } = req;
  if (role === 'owner' || role === 'admin' || role === 'superAdmin') {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized', success: false });
};

const isTheOwnerOrAdmin = (req, res, next) => {
  const { userId, local } = req;
  try {
    if (userId !== local.UserId) throw new Error('Only the owner of the local can modify a local.');
    next();
  } catch (error) {
    res.status(401).json({ message: error.message, success: false });
  }
};

module.exports = {
  isAdmin, isSuperAdmin, isOwner, isTheOwnerOrAdmin,
};
