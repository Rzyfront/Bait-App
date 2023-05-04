const { faker } = require('@faker-js/faker') // eslint-disable-line
const bcrypt = require('bcrypt');
const {
  User, Local, Review, Specialty, Image,
} = require('../db');

const IMAGE_TICKET = 'https://media.infocielo.com/p/780432ea548b27cfd7e58f79c482f43c/adjuntos/299/imagenes/001/385/0001385644/1200x675/smart/ticket-comprajpg.jpg';

const schedule = {
  sunday: '20:00 - 15:00',
  monday: '20:00 - 15:00',
  tuesday: '20:00 - 15:00',
  wednesday: '20:00 - 15:00',
  thursday: '20:00 - 15:00',
  friday: '20:00 - 15:00',
  saturday: '20:00 - 15:00',
};
const TYPES_LOCALS = ['Elegante', 'Joven', 'Nuevo', 'Colonial'];
const SPECIALTIES = [
  'Italiana',
  'Francesa',
  'India',
  'Asiática',
  'Parrilla',
  'Comida rápida',
  'Vegana',
  'Vegetariana',
  'Dietas especiales',
];
const crateSpecialties = () => Promise.all([
  SPECIALTIES.map((specialty) => Specialty.findOrCreate({ where: { name: specialty } })),
]);

const createRandomNumber = (multiplier, round = 'floor') => {
  if (round === 'ceil') return Math.ceil(Math.random() * multiplier);
  return Math.floor(Math.random() * multiplier);
};
const setSpecialtiesToLocal = () => new Set([
  createRandomNumber(9, 'ceil'),
  createRandomNumber(9, 'ceil'),
  createRandomNumber(9, 'ceil'),
  createRandomNumber(9, 'ceil'),
]);
const createFakeCharacteristic = () => ({
  type: TYPES_LOCALS[createRandomNumber(4)],
  wifi: !createRandomNumber(2),
  parking_lot: !createRandomNumber(2),
  outdoor_seating: !createRandomNumber(2),
  live_music: !createRandomNumber(2),
  table_service: !createRandomNumber(2),
  family_style: !createRandomNumber(2),
  romantic: !createRandomNumber(2),
  big_group: !createRandomNumber(2),
  work_friendly: !createRandomNumber(2),
  pet_friendly: !createRandomNumber(2),
  pay_apps: !createRandomNumber(2),
  debit_card: !createRandomNumber(2),
  credit_card: !createRandomNumber(2),
  cash: !createRandomNumber(2),
});

const createFakeUser = async () => {
  const [name, lastname, phone_number, email, location, password, image] = await Promise.all([
    faker.name.firstName(),
    faker.name.lastName(),
    faker.phone.number('+54 9 ### #######'),
    faker.internet.email(),
    faker.address.city(),
    bcrypt.hash('1234', 10),
    faker.image.avatar(),
  ]);
  const user = await User.create({
    name,
    lastname,
    phone_number,
    email,
    location,
    password,
    age: createRandomNumber(100),
    verified: 'verified',
  });
  user.createImage({ url: image });
  return user;
};
const createFakeLocal = async () => {
  const [name, location, address, email, lat, lng, ...images] = await Promise.all([
    faker.company.name(),
    faker.address.cityName(),
    faker.address.streetAddress(),
    faker.internet.email(),
    faker.address.latitude(),
    faker.address.longitude(),
    { url: faker.image.food(640, 480, true) },
    { url: faker.image.food(640, 480, true) },
    { url: faker.image.food(640, 480, true) },
    { url: faker.image.food(640, 480, true) },
    { url: faker.image.food(640, 480, true) },
    { url: faker.image.food(640, 480, true) },
  ]);
  const local = await Local.create({
    name,
    location,
    address,
    email,
    lat,
    lng,
  });
  local.createCharacteristic(createFakeCharacteristic());
  local.createSchedule(schedule);
  local.setSpecialties([...setSpecialtiesToLocal()]);
  Image.bulkCreate(images).then((imgs) => local.setImages(imgs.map(({ id }) => id)));
  return local;
};

const createFakeReview = async (userId, localId) => {
  const [title, comment, image] = await Promise.all([
    faker.lorem.words(createRandomNumber(3, 'ceil') + 1),
    faker.lorem.words(createRandomNumber(25, 'ceil') + 5),
    { url: faker.image.food(640, 480, true) },
  ]);
  const [food, environment, service, qaPrice] = [
    createRandomNumber(5, 'ceil'),
    createRandomNumber(5, 'ceil'),
    createRandomNumber(5, 'ceil'),
    createRandomNumber(5, 'ceil'),
  ];
  const verified = !createRandomNumber(2) ? 'verified' : 'unVerified';
  const rating = (food + environment + service + qaPrice) / 4;
  const review = await Review.create({
    food,
    environment,
    service,
    qaPrice,
    rating,
    title,
    comment,
    toxicity: Math.random(),
    verified,
  });
  review.setUser(userId);
  review.setLocal(localId);
  review.createTicket({ url: IMAGE_TICKET });
  review.createImage(image);
};

const FAKES_USERS_TO_CREATE = 20;
const LOCALS_TO_CREATE = 5;
const REVIEWS_TO_CREATE = 20;

const Seed = async () => {
  await crateSpecialties();
  const users = [];
  for (let i = 0; i < FAKES_USERS_TO_CREATE; i++) {
    users.push(createFakeUser());
  }
  try {
    const createdUsers = await Promise.all(users);
    createdUsers.map(async (user) => {
      console.log(user.id);
      const locals = [];
      for (let i = 0; i < LOCALS_TO_CREATE; i++) {
        locals.push(createFakeLocal());
      }
      const createdLocals = await Promise.all(locals);
      createdLocals.forEach((local) => {
        for (let i = 0; i < REVIEWS_TO_CREATE; i++) {
          createFakeReview(user.id, local.id);
        }
      });
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Done!');
  }
};
Seed();
