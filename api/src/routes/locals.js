const localsRoute = require('express').Router();
const getLocals = require('../controllers/Locals/getLocals');
const postLocal = require('../controllers/Locals/postLocal');
const putLocal = require('../controllers/Locals/putLocal');
const deleteLocal = require('../controllers/Locals/deleteLocal');
const paramLocal = require('../controllers/Locals/paramLocal');
const getLocalsDetail = require('../controllers/Locals/getLocalsDetail');

localsRoute.param('localId', paramLocal);
localsRoute.get('/', getLocals);
localsRoute.post('/', postLocal);
localsRoute.get('/:localId', getLocalsDetail);
localsRoute.put('/:localId', putLocal);
localsRoute.delete('/:localId', deleteLocal);

module.exports = localsRoute;
