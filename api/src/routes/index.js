const mainRouter = require('express').Router();
const localsRoute = require('./locals');
const reviewsRoute = require('./reviews');

mainRouter.use('/locals', localsRoute);
mainRouter.use('/reviews', reviewsRoute);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
