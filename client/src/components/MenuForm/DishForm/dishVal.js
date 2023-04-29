import {
  verifiedExists,
  verifiedLength
} from '../../../helpers/validations';

const validateForm = (data) => {
  const errors = {};
  if (data.name) {
    const result = verifiedLength(data.name, 30, 'El nombre');
    result && (errors.name = result);
  }

  if (data.type) {
    const result = verifiedExists(data.type, 'Este campo');
    result && (errors.type = result);
  }

  if (data.price) {
    const result = verifiedExists(data.price, 'El precio');
    result && (errors.price = result);
  }

  if (data.description) {
    const result = verifiedExists(data.description, 'Este campo');
    result && (errors.description = result);
  }
  return errors;
};

export default validateForm;
