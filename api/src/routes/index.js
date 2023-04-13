const mainRouter = require('express').Router();
const imageRoute = require('./images');
const localsRoute = require('./locals');
const userRoutes = require("./users")


const administratorRoute = require('./administrator');

mainRouter.use('/locals', localsRoute);
mainRouter.use('/images', imageRoute);
mainRouter.use('/administrator', administratorRoute);
mainRouter.use('/users', userRoutes);

mainRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = mainRouter;
