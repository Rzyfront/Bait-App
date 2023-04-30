const mainRouter = require('express').Router();
const administratorRoute = require('./administrator.routes');
const dishesRouter = require('./dishes.routes');
const imageRoute = require('./images.routes');
const localsRoute = require('./locals.routes');
const loginRoute = require('./login.routes');
// const menuRouter = require('./menu');
const reviewsRoute = require('./reviews.routes');
const { userExtractor } = require('../middlewares');
const userRoutes = require('./users.routes');

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
