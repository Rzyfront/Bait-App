const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (input) => {
  if (!emailRegex.test(input)) return 'Inserta un email válido';
};
export const verifiedTypeOf = (input, type, key) => {
  // eslint-disable-next-line valid-typeof
  if (typeof input !== type) return `${key} debe ser ${type}`;
};
export const verifiedLength = (input, length, key) => {
  if (input.length > length) return `${key} no debe ser mayor a ${length}`;
};

export const verifiedExists = (input, key) => {
  if (input === undefined) return `${key} es requerido`;
};

export const verifiedExistsTypeLength = (input, type, length, key) => {
  verifiedExists(input, key);
  verifiedTypeOf(input, type, key);
  verifiedLength(input, length, key);
};
