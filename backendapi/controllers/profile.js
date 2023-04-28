const bcrypt = require('bcryptjs');
const User = require('../models/users')
const { validationResult } = require('express-validator')
const crypto = require('crypto');



exports.getDetails = (req, res, next) => {
    const profileId = req.params.id;
    User.findById(profileId)
    .then(userDetails => {
      if (!userDetails) {
        const error = new Error('Could not find User of this id.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Users details fetched.', userDetails: userDetails });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}


exports.setupProfile =  (req, res, next) => {
    const profileId = req.params.id;
    const postId = req.params.postId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const name = req.body.name
    const DOB = req.body.dob;
    const gender = req.body.gender;

    User.findById(profileId)
      .then(userDetails => {
        if (!userDetails) {
          const error = new Error('Could not find post.');
          error.statusCode = 404;
          throw error;
        }
        userDetails.name = title;
        userDetails.otherInfo.dob = DOB;
        userDetails.otherInfo.gender = gender;
        return userDetails.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Profile updated!', post: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}