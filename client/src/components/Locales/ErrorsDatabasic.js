const regGmail = /^\S+@\S+\.\S+$/;

export const ErrorsDatabasic = (contenido) => {
  const error = {};
  if (contenido.name.length > 30) {
    error.name = 'Nombre muy grande';
  }
  if (contenido.name === '') {
    error.name = 'no tiene nombre';
  }
  if (!contenido.specialty.length) {
    error.specialty = 'Escoje una especialidad';
  }
  if (!regGmail.test(contenido.email)) {
    error.email = 'Correo no valido';
  }
  if (JSON.stringify(contenido.location) === '{}') {
    error.location = 'selecciona punto';
  }
  return error;
};
