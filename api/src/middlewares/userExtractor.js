const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('authorization');
  if (!token || !token.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ message: 'No authorization' });
  }
  try {
    const { id, email, role } = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
    req.userId = id;
    req.email = email;
    req.role = role;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'No authorization' });
  }
};
