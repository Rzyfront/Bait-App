const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('authorization');
  if (!token || !token.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ success: false, message: 'Sin autorización' });
  }
  try {
    const {
      id, email, role, verified,
    } = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
    if (verified !== 'verified') {
      return res.status(401).json({ success: false, message: 'Sin autorización' });
    }
    req.userId = id;
    req.email = email;
    req.role = role;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Sin autorización' });
  }
};
