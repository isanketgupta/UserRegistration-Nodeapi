const express = require('express');
const signupController = require('../controllers/signupUser');
const User = require('../models/users')
const { check, validationResult } = require('express-validator');

// const body = check
const router = express.Router();


router.put(
    '/add',
    [
        check('email').isEmail().withMessage('Please enter a valid email.')
          .custom((value, { req } ) => {
            console.log(value)
            return User.findOne({ email: value }).then(userDoc => {
              if (userDoc) {
                console.log('emial alreday exists')
                return Promise.reject('E-Mail address already exists!');
              }
            });
          }).normalizeEmail(),
        check('password').trim().not().isEmpty(),
        check('name').trim().not().isEmpty()
    ],
      signupController.signup
    )

router.get('/verify/:tokken',
    signupController.verifyEmail
 );


 module.exports = router;
