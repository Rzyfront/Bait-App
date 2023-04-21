const {
  verifiedTypeOf, verifiedExists, verifiedExistsTypeLength,
} = require('../helpers/validations');

module.exports = (req, res, next) => {
  try {
    const {
      name, type, ingredients, price, description, image,
    } = req.body;

    // NAME
    verifiedExistsTypeLength(name, 'string', 50, 'name');

    // TYPE
    verifiedExistsTypeLength(type, 'string', 50, 'type');

    // PRICE
    verifiedExists(price, 'price');
    verifiedTypeOf(price, 'number', 'price');

    // INGREDIENTS
    verifiedExistsTypeLength(ingredients, 'string', 200, 'ingredients');
    // DESCRIPTION
    verifiedExistsTypeLength(description, 'string', 500, 'description');

    // IMAGE
    verifiedExists(image, 'image');
    verifiedTypeOf(image, 'object', 'image');

    verifiedExists(image.url, 'image.url');
    verifiedTypeOf(image.url, 'string', 'image.url');

    req.dish = {
      name, type, ingredients, price, description, image,

    };

    next();
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
 

  