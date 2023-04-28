const Signup = require('../models/signup');
const bcrypt = require('bcryptjs');
const User = require('../models/users')
const { validationResult } = require('express-validator')
const crypto = require('crypto');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email+password+'<<')
    let loadedUser;
    User.findOne({ email: email, emailVerification: true })
      .then(user => {
        if (!user) {
          const error = new Error('A user with this email could not be found.');
          error.statusCode = 401;
          throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
      })
      .then(isEqual => {
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
          },
          'donotdisclosesecrectkey',
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  