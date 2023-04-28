const express = require('express');
const signupController = require('../controllers/signupUser');
const User = require('../models/users')
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/auth');


const router = express.Router();

router.post('/login', [
    check('email').isEmail().withMessage('Please enter a valid email.'),
    check('password').trim().not().isEmpty()
], authController.login )

module.exports = router;

