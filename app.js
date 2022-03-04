const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const app = express();
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://mrnabdulai:BIGBANG123@cluster0.bdiqx.mongodb.net/node-auth';
mongoose.connect(dbURI)
  .then((result) => app.listen(process.env.PORT || 5000, ()=>{console.log("server started")
 }))
  .catch((err) => console.log(err));

// app.listen(3000, ()=>{console.log("Server Started")});
// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)


// cookies

