const express = require('express');
const mongoose = require('mongoose');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());



// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://caveman:jwtauth@jwt-practice.cntyf.mongodb.net/jwtdb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));