const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');
const CategoriesController = require('../controllers/categoriesController');


//TASKS ROUTES START WHIT /TASKS/
router.get('/productsList', ProductsController.getAllProductsForPanel);
router.get('/categoryList', CategoriesController.getAllCategoriesForPanel);
module.exports = router;