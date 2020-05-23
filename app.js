require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');

const admin = require('./routes/api/admin');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');
const user = require('./routes/api/user');
const book = require('./routes/api/book');
const cors = require('cors');
//init app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// DB config
const db = require('./config/key').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use(cors());
// Use Routes
app.use('/api/admin', admin);
app.use('/api/posts', post);
app.use('/api/profile', profile);
app.use('/api/users', user);
app.use('/api/book', book);

// Set portnumber
const portnumber = process.env.PORT || 5000;

// Start Server
app.listen(portnumber, () => {
    console.log(`Server started port ${portnumber}`);
});
