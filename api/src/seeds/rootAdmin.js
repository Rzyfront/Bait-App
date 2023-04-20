const bcrypt = require('bcrypt');
const { User } = require('../db');

const {
  ROOT_ADMIN_NAME,
  ROOT_ADMIN_LASTNAME,
  ROOT_ADMIN_AGE,
  ROOT_ADMIN_EMAIL,
  ROOT_ADMIN_LOCATION,
  ROOT_ADMIN_PHONE,
  ROOT_ADMIN_PASSWORD,
} = process.env;

const createRootAdmin = async () => {
  const password = await bcrypt.hash(ROOT_ADMIN_PASSWORD, 10);
  User.create({
    name: ROOT_ADMIN_NAME,
    lastname: ROOT_ADMIN_LASTNAME,
    age: ROOT_ADMIN_AGE,
    email: ROOT_ADMIN_EMAIL,
    location: ROOT_ADMIN_LOCATION,
    phone_number: ROOT_ADMIN_PHONE,
    password,
    verified: 'verified',
    role: 'superAdmin',
  }).catch((err) => console.log(err)).finally(() => console.log('Done!'));
};
createRootAdmin();
