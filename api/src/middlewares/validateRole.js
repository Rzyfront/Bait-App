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

module.exports = { isAdmin, isSuperAdmin, isOwner };
