// const { allCharacteristics } = require('../helpers/allCharacteristics');
const { /* isEmail, verifiedExistsTypeLength, */ verifiedTypeOf, verifiedExists } = require('../helpers/validations');

module.exports = (req, res, next) => {
  const {
    name, location, /* schedule, email,images, specialty, characteristics, */ lat, lng,
  } = req.body;

  try {
    if (name) verifiedTypeOf(name, 'string', 'name');
    else throw new Error('Datos incompletos');

    if (location) verifiedTypeOf(location, 'string', 'location');
    else throw new Error('Datos incompletos');

    verifiedExists(lat, 'lat');
    verifiedExists(lng, 'lng');

    // if (schedule) verifiedTypeOf(schedule, 'string', 'schedule');

    // if (email) {
    //   verifiedTypeOf(email, 'string', 'email');
    //   if (!isEmail(email)) throw new Error('bad email format');
    // }

    // if (characteristics) {
    //   verifiedTypeOf(characteristics, 'object');
    //   // console.log(Object.keys(characteristics));
    //   if (!Object.keys(characteristics).every((e) => allCharacteristics.includes(e))
    //   || !Object.values(characteristics).every((e) => typeof e === 'boolean')) { throw new Error('bad data into characteristics'); }
    // }

    // if (images) verifiedTypeOf(images, 'object', 'images');

    // // SPECIALTY
    // verifiedExistsTypeLength(specialty, 'string', 50, 'specialty');
    return next();
  } catch (err) {
    return res.status(404).json({ success: false, message: err.message });
  }
};
