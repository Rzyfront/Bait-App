import { isAppropriate } from '../../helpers/validations';

export default function validate (data) {
  const errors = {};

  if (data.comment) {
    const result = isAppropriate(data.comment);
    result && (errors.comment = result);
  }
  return errors;
}
