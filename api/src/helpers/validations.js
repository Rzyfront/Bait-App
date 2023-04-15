const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmail = (input) => emailRegex.test(input);
const verifiedTypeOf = (input, type) => {
  // eslint-disable-next-line valid-typeof
  if (typeof input !== type) throw new Error(`${input} must be ${type}`);
};

module.exports = { isEmail, verifiedTypeOf };
