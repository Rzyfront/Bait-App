const mainRouter = require('express').Router();
const administratorRoute = require('./administrator');
const dishesRouter = require('./dishes');
const imageRoute = require('./images');
const localsRoute = require('./locals');
const loginRoute = require('./login');
const menuRouter = require('./menu');
const reviewsRoute = require('./reviews');
const userExtractor = require('../middlewares/userExtractor');
const userRoutes = require('./users');

mainRouter.use('/locals', localsRoute)
  .use('/login', loginRoute)
  .use('/images', imageRoute)
  .use('/reviews', reviewsRoute)
  .use('/administrator', userExtractor, administratorRoute)
  .use('/dishes', dishesRouter)
  .use('/user', userRoutes)
  .use('/menu', menuRouter);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
