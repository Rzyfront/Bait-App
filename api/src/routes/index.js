const mainRouter = require('express').Router();
const imageRoute = require('./images');
const localsRoute = require('./locals');
const administratorRoute = require('./administrator');

mainRouter.use('/locals', localsRoute);
mainRouter.use('/images', imageRoute);
mainRouter.use('/administrator', administratorRoute);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
