const express = require('express');
const router = express.Router();


// const User = require('../../models/User');
const passport = require('passport');
const CategoriesController = require('../controllers/categoriesController');


//TASKS ROUTES START WHIT /TASKS/
router.get('/', CategoriesController.getAllCategories);
router.get('/:id', passport.authenticate('jwt', {session: false}), CategoriesController.getCategoriesById);
router.get('/:id/products', passport.authenticate('jwt', {session: false}), CategoriesController.getAllCategoryProducts);
router.post('/', passport.authenticate('jwt', {session: false}), CategoriesController.createCategories);
router.put('/:id', passport.authenticate('jwt', {session: false}), CategoriesController.updateCategories);
router.delete('/:id', passport.authenticate('jwt', {session: false}), CategoriesController.deleteCategories);
module.exports = router;