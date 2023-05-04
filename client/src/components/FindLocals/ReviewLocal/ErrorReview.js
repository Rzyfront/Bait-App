
export const ErrorReview = (contenido) => {
  const error = {};
  if (contenido.title === '') {
    error.title = 'Falta titulo';
  }
  if (contenido.review === '') {
    error.review = 'Falta comentario';
  }
  if (JSON.stringify(contenido.image) === '{}') {
    error.image = 'falta imagen';
  }
  if (JSON.stringify(contenido.Tiket) === '{}') {
    error.Tiket = 'falta imagEN de tiket';
  }
  return error;
};
