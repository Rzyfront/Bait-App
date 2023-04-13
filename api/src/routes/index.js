const mainRouter = require('express').Router();
const imageRoute = require('./images');
const localsRoute = require('./locals');
const userRoutes = require("./users")

mainRouter.use('/locals', localsRoute);
mainRouter.use('/images', imageRoute);
mainRouter.use('/user', userRoutes);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
