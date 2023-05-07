export const validation = (data) => {
  const errors = {};
  const regPass = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regPhone = /^[0-9]{8,}$/;
  if (!regPass.test(data.password)) errors.password = 'La contraseña debe contener al menos una letra mayúscula, un número y ocho caracteres';
  if (data.password !== data.password2) errors.password = 'Las contraseñas deben coincidir';
  if (!regEmail.test(data.email)) errors.password = 'Ingresa un email válido';
  if (!regPhone.test(data.phone_number)) errors.password = 'Ingresa número de teléfono válido';
  if (data.name.length > 20) errors.password = 'Nombre muy grande';
  if (data.lastname.length > 20) errors.password = 'Apellido muy grande';
  if (data.age < 15) errors.password = 'La edad mínima permitida es de 15 años';
  if (!data.name.length || !data.password.length || !data.lastname.length || !data.age.length || !data.phone_number.length || !data.email.length || !data.location.length) errors.password = 'Todos los campos son obligatorios';
  return errors;
};

export const validationLogin = (data) => {
  const errors = {};

  if (data.email === '') errors.email = 'Este campo es requerido';

  if (data.password === '') errors.password = 'Este campo es requerido';

  return errors;
};
