const express = require('express')();
const morgan = require('morgan');
const mainRouter = require('./routes/index');

express.use(morgan('dev'));
express.use(require('express').json());

express.use(mainRouter);

module.exports = express;
