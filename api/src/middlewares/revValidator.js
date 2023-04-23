const {
  verifiedTypeOf,
  verifiedExistsTypeLength,
  verifiedExists,
} = require('../helpers/validations');
const { prospectiveApi } = require('../helpers/badWords');

module.exports = async (req, res, next) => {
  try {
    const {
      title, comment, /* image, */ food, service, environment, qaPrice,
    } = req.body;

    // TITLE
    verifiedExistsTypeLength(title, 'string', 50, 'title');

    // COMMENT
    verifiedExistsTypeLength(comment, 'string', 700, 'comment');
    // isAppropriate(comment);
    // QUALIFICATIONS
    const qualifications = {
      food,
      service,
      environment,
      qaPrice,
    };

    Object.entries(qualifications).forEach(([key, value]) => {
      if (value !== undefined) {
        verifiedExists(key, key);
        verifiedTypeOf(value, 'number', key);
        if (value > 5) { throw new Error(`The value of "${key}" can not be greater than 5`); }
      }
    });

    // IMAGE
    // verifiedExists(image, 'image');
    // verifiedTypeOf(image, 'object', 'image');
    // verifiedTypeOf(image.url, 'string', 'url');

    if (await prospectiveApi(comment))req.verrfied = 'archived';
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
