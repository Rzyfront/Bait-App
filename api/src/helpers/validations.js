const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmail = (input) => emailRegex.test(input);
const verifiedTypeOf = (input, type, key) => {
  // eslint-disable-next-line valid-typeof
  if (typeof input !== type) throw new Error(`${key} must be ${type}`);
};
const verifiedLength = (input, length, key) => {
  if (input.length > length) throw new Error(`${key} must not be greater than ${length}`);
};

const verifiedExists = (input, key) => {
  if (input === undefined) throw new Error(`${key} is required`);
};

const verifiedExistsTypeLength = (input, type, length, key) => {
  verifiedExists(input, key);
  verifiedTypeOf(input, type, key);
  verifiedLength(input, length, key);
};

module.exports = {
  isEmail, verifiedTypeOf, verifiedLength, verifiedExists, verifiedExistsTypeLength,
};
