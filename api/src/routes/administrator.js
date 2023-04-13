const administratorRoute = require('express').Router();
const getAdministrators = require('../controllers/administrator/getAdministrators');
const updateAdministrator = require('../controllers/administrator/updateAdministrator');
const deleteAdministrator = require('../controllers/administrator/deleteAdministrator');
const changeRole = require('../controllers/administrator/changeRole');

administratorRoute.get('/', getAdministrators);
administratorRoute.put('/', updateAdministrator);
administratorRoute.delete('/', deleteAdministrator);
administratorRoute.patch('/role/:userId', changeRole);

module.exports = administratorRoute;
