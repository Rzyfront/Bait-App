const regGmail = /^\S+@\S+\.\S+$/;
export const validateForm = (data) => {
  const errors = {};
  if (data.name.length > 30) {
    errors.name = 'Nombre muy grande';
  }
  if (!data.specialty.length) {
    errors.specialty = 'Escoje una especialidad';
  }
  if (!regGmail.test(data.email)) {
    errors.email = 'Correo no valido';
  }
  if (JSON.stringify(data.location) === '{}') {
    errors.location = 'selecciona punto';
  }
  if (!data.images.length) {
    errors.images = 'falta foto';
  }
  if (!data.schedule.length) {
    errors.schedule = 'falta horarios';
  }

  return errors;
};
