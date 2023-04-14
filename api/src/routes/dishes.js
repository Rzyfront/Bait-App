const dishesRouter = require('express').Router();
const deleteDish = require('../controllers/dishes/deleteDish');
const postDish = require('../controllers/dishes/postDish');
const putDish = require('../controllers/dishes/putDish');

dishesRouter.post('/:menuId', postDish);
dishesRouter.put('/:dishId', putDish);
dishesRouter.delete('/:dishId', deleteDish);

module.exports = dishesRouter;
