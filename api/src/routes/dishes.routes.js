const dishesRouter = require('express').Router();
const { dishValidator } = require('../middlewares');

const {
  deleteDish, postDish, putDish, getDish,
} = require('../controllers/dishes');

dishesRouter
  .get('/:dishId', getDish)
  .post('/:menuId', dishValidator, postDish)
  .put('/:dishId', dishValidator, putDish)
  .delete('/:dishId', deleteDish);

module.exports = dishesRouter;
