const mainRouter = require('express').Router();
const imageRoute = require('./images');
const localsRoute = require('./locals');

mainRouter.use('/locals', localsRoute);
mainRouter.use('/images', imageRoute);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
