const express = require('express');
const router = express.Router();


// const User = require('../../models/User');
const passport = require('passport');
const HandbooksController = require('../controllers/handbooksController');


//TASKS ROUTES START WHIT /TASKS/
router.get('/', passport.authenticate('jwt', {session: false}), HandbooksController.getAllHandbooks);
router.get('/:id', passport.authenticate('jwt', {session: false}), HandbooksController.getHandbooksById);
router.post('/', passport.authenticate('jwt', {session: false}), HandbooksController.createHandbooks);
router.put('/:id', passport.authenticate('jwt', {session: false}), HandbooksController.updateHandbooks);
router.delete('/:id', passport.authenticate('jwt', {session: false}), HandbooksController.deleteHandbooks);
module.exports = router;