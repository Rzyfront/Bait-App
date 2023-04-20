import {
  isEmail,
  verifiedExists,
  verifiedLength
} from '../../helpers/validations';

export const validateForm = (data) => {
  const errors = {};
  if (!Object.keys(data).length) errors.rule = 'No puede estar vacío';
  if (data.name) {
    const result = verifiedLength(data.name, 30, 'El nombre');
    result && (errors.name = result);
  }

  if (data.email) {
    const result = isEmail(data.email);
    result && (errors.email = result);
  }

  if (data.phone) {
    const result = verifiedLength(data.phone, 20, 'El teléfono');
    result && (errors.phone = result);
  }

  if (data.location) {
    const result = verifiedExists(data.location, 'location');
    result && (errors.location = result);
  }

  if (!data.schedule) {
    const result = verifiedExists(data.schedule, 'El horario');
    result && (errors.schedule = result);
  }
  return errors;
};
