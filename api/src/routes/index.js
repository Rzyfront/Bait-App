const mainRouter = require('express').Router();
const localsRoute = require('./locals');

mainRouter.use('/locals', localsRoute);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
