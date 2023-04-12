const express = require('express')();
const morgan = require('morgan');

express.use(morgan('dev'));
express.get('/', (req, res) => {
  res.status(200).send('Hola Mundo!');
});

module.exports = express;
