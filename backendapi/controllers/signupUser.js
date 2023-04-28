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

  exports.verifyEmail = (req, res, next) => {
    const tokken = req.params.tokken;
    console.log('verifying emial')
    User.findOne({verifyToken : tokken }).then(
        userData => {
            if (userData){
                userData.emailVerification = true
                userData.save().then(()=> {
                    res.status(201).json({ message: 'email verified!!' });
                })
            }
        }
    )
  }

  exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt
      .hash(password, 12)
      .then(hashedPw => {
        crypto.randomBytes(32, (err, buffer, hashedPw ) => {
            const token = buffer.toString('hex')
            const user = new User({
                email: email,
                password: hashedPw,
                name: name,
                verifyToken: token,
                otherInfo: {}
              });
              return user.save().then(
                () => {
                    return transporter.sendMail({
                        to: 'guptasanketsg@gmail.com',
                        from: 'guptasanketsg@gmail.com',
                        subject: 'Signup succeeded!',
                        html: '<h1>You successfully signed up!</h1><a href="localhost:4000/createuser/verify/'+token+'">chick here to verify user</a>'
                      });
                }
              );
        })
      })
      .then(result => {
        res.status(201).json({ message: 'User created!' });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };