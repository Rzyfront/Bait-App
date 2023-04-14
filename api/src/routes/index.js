const mainRouter = require('express').Router();
const administratorRoute = require('./administrator');
const dishesRouter = require('./dishes');
const imageRoute = require('./images');
const localsRoute = require('./locals');
const menuRouter = require('./menu');
const reviewsRoute = require('./reviews');
const userRoutes = require('./users');
// const loginRoute = require('./login');

mainRouter.use('/locals', localsRoute);
mainRouter.use('/reviews', reviewsRoute);
mainRouter.use('/images', imageRoute);
mainRouter.use('/administrator', administratorRoute);
mainRouter.use('/dishes', dishesRouter);
mainRouter.use('/users', userRoutes);
mainRouter.use('/menu', menuRouter);
// mainRouter.use('/login', loginRoute);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
