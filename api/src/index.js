const express = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');//eslint-disable-line
const mainRouter = require('./routes/index');

express.use(cors('*'));
express.use(morgan('dev'));
express.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
express.use(bodyParser.json({ limit: '50mb' }));

// express.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

express.use(mainRouter);

module.exports = express;
