const dishesRouter = require('express').Router();
const { dishValidator } = require('../middlewares');

const { deleteDish, postDish, putDish } = require('../controllers/dishes');

dishesRouter
  .post('/:menuId', dishValidator, postDish)
  .put('/:dishId', dishValidator, putDish)
  .delete('/:dishId', deleteDish);

module.exports = dishesRouter;
