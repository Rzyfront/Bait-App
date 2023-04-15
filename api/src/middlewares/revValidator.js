const {
  verifiedTypeOf, verifiedExistsTypeLength,
} = require('../helpers/validations');
const { isAppropriate } = require('../helpers/badWords');

module.exports = (req, res, next) => {
  try {
    const {
      title, comment, photos, food, service, environment, qaPrice,
    } = req.body;

    // TITLE
    verifiedExistsTypeLength(title, 'string', 50, 'title');

    // COMMENT
    verifiedExistsTypeLength(comment, 'string', 700, 'comment');
    isAppropriate(comment);

    if (!food && !service && !environment && !qaPrice) {
      throw new Error('At least one qualification property must be provided');
    }

    // QUALIFICATIONS
    const qualifications = {
      food, service, environment, qaPrice,
    };

    Object.entries(qualifications).forEach(([key, value]) => {
      if (value !== undefined) {
        verifiedTypeOf(value, 'number', key);
        if (value > 5) throw new Error(`The value of "${key}" can not be greater than 5`);
      }
    });

    // IMAGE
    if (photos) {
      verifiedTypeOf(photos, 'object', 'photos');

      if (photos.length > 3) throw new Error('Only up to 3 photos are allowed.');
      photos.forEach((photo) => {
        verifiedTypeOf(photo.url, 'string', 'url');
      });
    }

    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
