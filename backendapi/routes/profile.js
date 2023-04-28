const express = require('express');
const signupController = require('../controllers/signupUser');
const User = require('../models/users')
const { check, validationResult } = require('express-validator');
const profileController = require('../controllers/profile');
const isAuth = require('../middleware/check-auth');


const router = express.Router();


router.get('/profile/:id', isAuth , profileController.getDetails )


router.get('/setup/:id', isAuth, profileController.setupProfile )


module.exports = router;
