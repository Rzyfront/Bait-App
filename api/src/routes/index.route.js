const mainRouter = require('express').Router();
const administratorRoute = require('./administrator.route');
const dishesRouter = require('./dishes.route');
const imageRoute = require('./images.route');
const localsRoute = require('./locals.route');
const loginRoute = require('./login.route');
// const menuRouter = require('./menu');
const reviewsRoute = require('./reviews.route');
const userExtractor = require('../middlewares/userExtractor');
const userRoutes = require('./users.route');

mainRouter
  .use('/locals', localsRoute)
  .use('/login', loginRoute)
  .use('/images', imageRoute)
  .use('/reviews', reviewsRoute)
  .use('/administrator', userExtractor, administratorRoute)
  .use('/dishes', dishesRouter)
  .use('/user', userRoutes);
// .use('/menu', menuRouter);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
