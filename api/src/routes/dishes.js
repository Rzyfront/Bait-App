const dishesRouter = require('express').Router();
const deleteDish = require('../controllers/dishes/deleteDish');
const postDish = require('../controllers/dishes/postDish');
const putDish = require('../controllers/dishes/putDish');
const dishValidator = require('../middlewares/dishValidator');

dishesRouter.post('/:menuId', dishValidator, postDish);
dishesRouter.put('/:dishId', dishValidator, putDish);
dishesRouter.delete('/:dishId', deleteDish);

module.exports = dishesRouter;
