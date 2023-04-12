const express = require('express')();
const morgan = require('morgan');//eslint-disable-line
const mainRouter = require('./routes/index');

express.use(morgan('dev'));
express.use(require('express').json());

express.use(mainRouter);

module.exports = express;
