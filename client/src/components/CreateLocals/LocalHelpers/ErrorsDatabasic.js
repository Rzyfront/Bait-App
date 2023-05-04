
export const ErrorsDatabasic = (contenido) => {
  const error = {};
  if (contenido.name.length > 30) {
    error.name = 'Nombre muy grande';
  }
  if (contenido.name === '') {
    error.name = 'no tiene nombre';
  }
  if (JSON.stringify(contenido.location) === '{}') {
    error.location = 'selecciona punto';
  }
  // limit argentina create locals
  if (JSON.stringify(contenido.location) !== '{}' &&
    contenido.location.location.split(',').at(-1) !== 'Argentina' &&
    contenido.location.location.split(', ').at(-1) !== 'ARG'
  ) {
    error.location = 'no es argentina';
  }
  return error;
};
