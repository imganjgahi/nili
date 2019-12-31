const express = require('express');
const router = express.Router();


// const User = require('../../models/User');
const passport = require('passport');
const UserController = require('../controllers/usersController');


//register user
router.post('/register', UserController.userRegister);

router.post('/login', UserController.userLogin);

router.get('/current', 
passport.authenticate('jwt', {session: false}), 
(req, res)=>{
    res.json({id: req.user.id, name: req.user.name, email: req.user.email});
});
module.exports = router;