const express = require('express')();
const morgan = require('morgan');//eslint-disable-line
const mainRouter = require('./routes/index');
const bodyParser = require('body-parser');//eslint-disable-line

express.use(morgan('dev'));
express.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
express.use(bodyParser.json({ limit: '50mb' }));

express.use(mainRouter);

module.exports = express;
