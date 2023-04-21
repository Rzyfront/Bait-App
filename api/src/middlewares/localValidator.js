const { allCharacteristics } = require('../helpers/allCharacteristics');
const { /* isEmail, */ verifiedTypeOf, verifiedExistsTypeLength } = require('../helpers/validations');

module.exports = (req, res, next) => {
  const {
    name, location, schedule, /* email, */ characteristics, images, specialty,
  } = req.body;

  try {
    if (name) verifiedTypeOf(name, 'string', 'name');
    else throw new Error('Incomplete data');

    if (location) verifiedTypeOf(location, 'string', 'location');
    else throw new Error('Incomplete data');

    if (schedule) verifiedTypeOf(schedule, 'string', 'schedule');

    // if (email) {
    //   verifiedTypeOf(email, 'string', 'email');
    //   if (!isEmail(email)) throw new Error('bad email format');
    // }

    if (characteristics) {
      verifiedTypeOf(characteristics, 'object');
      // console.log(Object.keys(characteristics));
      if (!Object.keys(characteristics).every((e) => allCharacteristics.includes(e))
      || !Object.values(characteristics).every((e) => typeof e === 'boolean')) { throw new Error('bad data into characteristics'); }
    }

    if (images) verifiedTypeOf(images, 'object', 'images');

    // SPECIALTY
    verifiedExistsTypeLength(specialty, 'string', 50, 'specialty');
    return next();
  } catch (err) {
    return res.status(404).json({ success: false, message: err.message });
  }
};
