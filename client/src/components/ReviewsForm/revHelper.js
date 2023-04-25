
export default function validate (data) {
  const errors = {};

  if (!data.title.length) {
    errors.title = 'Falta titulo';
  }
  if (!data.comment.length) {
    errors.title = 'Falta comentario';
  }
  if (!data.comment.length) {
    errors.title = 'Falta comentario';
  }
  if (!data.image) {
    errors.image = 'Tome una foto';
  }

  return errors;
}
