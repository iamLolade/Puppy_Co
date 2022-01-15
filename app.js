const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

dotenv.config({path: "./config.env"})
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(authRoutes);
app.use(cookieParser())



// view engine
app.set('view engine', 'ejs');

// database connection
const database = process.env.dbURI
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser );
app.get('/', (req, res) => res.render('home'));
app.get('/puppies', requireAuth,(req, res) => res.render('puppies'));

