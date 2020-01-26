const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// const admin = require('./routes/admin');
// const post = require('./routes/post');
// const profile = require('./routes/profile');
const user = require('./routes/api/user');

//init app 
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/db.mongodb').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
// app.use('/api/admin', admin);
// app.use('/api/post', post);
// app.use('/api/profile', profile);
app.use('/api/user', user);

// Set portnumber
const portnumber = process.env.PORT || 3000

// Start Server
app.listen(portnumber, function(){
    console.log('Server started port 3000');
});