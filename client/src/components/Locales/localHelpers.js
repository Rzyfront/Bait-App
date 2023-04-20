import { isEmail, verifiedExists, verifiedExistsTypeLength } from '../../helpers/validations';

export const validateForm = (data) => {
  const errors = {};
  if (data.name) errors.name = verifiedExistsTypeLength(data.name, 'string', 30, 'El nombre');

  if (data.email) errors.email = isEmail(data.email);

  if (data.phone) errors.phone = verifiedExistsTypeLength(data.phone, 'string', 20, 'El teléfono');

  if (data.location) errors.location = verifiedExists(errors.location, 'location');

  if (!data.schedule) errors.schedule = verifiedExists(data.schedule, 'El horario');

  if (!data.image) errors.image = 'Selecciona una o varias imágenes.';

  return errors;
};
