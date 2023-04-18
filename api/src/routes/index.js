const mainRouter = require('express').Router();
const administratorRoute = require('./administrator');
const dishesRouter = require('./dishes');
const imageRoute = require('./images');
const localsRoute = require('./locals');
const menuRouter = require('./menu');
const reviewsRoute = require('./reviews');
const userRoutes = require('./users');
const loginRoute = require('./login');
const paymentsRoute = require('./payments');

mainRouter.use('/locals', localsRoute)
  .use('/reviews', reviewsRoute)
  .use('/images', imageRoute)
  .use('/administrator', administratorRoute)
  .use('/dishes', dishesRouter)
  .use('/user', userRoutes)
  .use('/menu', menuRouter)
  .use('/login', loginRoute)
  .use('/payments', paymentsRoute);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
