const regGmail = /^\S+@\S+\.\S+$/;
export const validateForm = (data) => {
  const errors = {};
  if (data.name.length > 30) {
    errors.name = 'Nombre muy grande';
  }
  if (!data.specialty.length) {
    errors.specialty = 'Escoge una especialidad';
  }
  if (!regGmail.test(data.email)) {
    errors.email = 'Correo no válido';
  }
  if (JSON.stringify(data.location) === '{}') {
    errors.location = 'Selecciona un punto';
  }
  if (!data.images.length) {
    errors.images = 'Sube una imagen';
  }
  if (!data.schedule.length) {
    errors.schedule = 'falta horarios';
  }

  return errors;
};
