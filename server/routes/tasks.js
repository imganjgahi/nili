const express = require('express');
const router = express.Router();


// const User = require('../../models/User');
const passport = require('passport');
const TasksController = require('../controllers/tasksController');


//TASKS ROUTES START WHIT /TASKS/
router.get('/', passport.authenticate('jwt', {session: false}), TasksController.getAllTasks);
router.get('/:id', passport.authenticate('jwt', {session: false}), TasksController.getTasksById);
router.post('/', passport.authenticate('jwt', {session: false}), TasksController.createTasks);
router.put('/:id', passport.authenticate('jwt', {session: false}), TasksController.updateTasks);
router.delete('/:id', passport.authenticate('jwt', {session: false}), TasksController.deleteTasks);
module.exports = router;