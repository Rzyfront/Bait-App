const menuRouter = require('express').Router();
const getMenu = require('../controllers/menu/getMenu');
const postMenu = require('../controllers/menu/postMenu');

menuRouter.post('/:localId', postMenu);
menuRouter.get('/:menuId', getMenu);

module.exports = menuRouter;
