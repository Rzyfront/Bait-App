import { isEmail, verifiedExists, verifiedLength } from '../../helpers/validations';

export const validateForm = (data) => {
  const errors = {};
  if (data.name) errors.name = verifiedLength(data.name, 30, 'El nombre');

  if (data.email) errors.email = isEmail(data.email);

  if (data.phone) errors.phone = verifiedLength(data.phone, 20, 'El teléfono');

  if (data.location) errors.location = verifiedExists(errors.location, 'location');

  if (!data.schedule) errors.schedule = verifiedExists(data.schedule, 'El horario');

  return errors;
};
