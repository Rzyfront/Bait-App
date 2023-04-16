const { Local } = require('../../db');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next, id) => {
  try {
    const localFound = await Local.findByPk(Number(id));
    if (localFound) {
      req.local = localFound;
      next();
    } else {
      throw new Error('Not Found');
    }
  } catch (err) {
    return res.status(404).json({ success: false, message: err.message });
  }
};
