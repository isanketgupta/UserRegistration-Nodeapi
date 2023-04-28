const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const signupRoute = require('./routes/signupUser')
const authRoute = require('./routes/authentication')
const profileRoute = require('./routes/profile')

const MONGODB_URI ='mongodb+srv://user2:LTHA8PaU7rYCFzFY@cluster0.l8xmgxg.mongodb.net/project';

const app = express();

// app.use( bodyParser.urlencoded({extends : false}) )
app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader( 'Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE' );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


app.use('/createuser',signupRoute)

app.use('/auth',authRoute)

app.use('/home',profileRoute)


// if error occur, this route will be executed
app.use((error, req, res, next) => {
    console.log('request recive')
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

app.get('/' , (req,res,next) => {
    console.log('request recive to home')
})

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log('database connected')
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
