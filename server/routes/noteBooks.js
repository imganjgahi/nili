const express = require('express');
const router = express.Router();


// const User = require('../../models/User');
const passport = require('passport');
const NoteBooksController = require('../controllers/noteBooksController');


//   MAIN URL = '/api/notebooks'
//TASKS ROUTES START WHIT /TASKS/
router.get('/', passport.authenticate('jwt', {session: false}), NoteBooksController.getAllNoteBooks);
router.get('/:id/tasks', passport.authenticate('jwt', {session: false}), NoteBooksController.getNoteBookTask);
router.get('/:id', passport.authenticate('jwt', {session: false}), NoteBooksController.getNoteBooksById);
router.post('/', passport.authenticate('jwt', {session: false}), NoteBooksController.createNoteBooks);
router.put('/:id', passport.authenticate('jwt', {session: false}), NoteBooksController.updateNoteBooks);
router.delete('/:id', passport.authenticate('jwt', {session: false}), NoteBooksController.deleteNoteBooks);
module.exports = router;