
export const ErrorsDatabasic = (contenido) => {
  const error = {};
  if (contenido.name.length > 30) {
    error.name = 'La longitud del nombre excede lo permitido';
  }
  if (contenido.name === '') {
    error.name = 'Agregue el nombre del local';
  }
  if (JSON.stringify(contenido.location) === '{}') {
    error.location = 'Selecciona un punto en el mapa';
  }
  if (JSON.stringify(contenido.document) === '{}') {
    error.location = 'Ingrese documentación ';
  }
  // limit argentina create locals
  if (JSON.stringify(contenido.location) !== '{}' &&
    contenido.location.location.split(',').at(-1) !== 'Argentina' &&
    contenido.location.location.split(', ').at(-1) !== 'ARG'
  ) {
    error.location = 'El local debe estar ubicado en Argentina';
  }
  return error;
};
