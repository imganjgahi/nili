const express = require('express');
const router = express.Router();


// const User = require('../../models/User');
const passport = require('passport');
const ProductsController = require('../controllers/productsController');


//TASKS ROUTES START WHIT /TASKS/
router.get('/', passport.authenticate('jwt', {session: false}), ProductsController.getAllProducts);
router.get('/:id', passport.authenticate('jwt', {session: false}), ProductsController.getProductsById);
router.post('/', passport.authenticate('jwt', {session: false}), ProductsController.createProducts);
router.put('/:id', passport.authenticate('jwt', {session: false}), ProductsController.updateProducts);
router.delete('/:id', passport.authenticate('jwt', {session: false}), ProductsController.deleteProducts);
module.exports = router;