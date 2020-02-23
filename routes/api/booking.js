const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import Models 
const User = require('../../models/user');
const Post = require('../../models/post');


// import input validation
const validateBookInput = require('../../validator/book');

// const mysqlCon = require('../../controller/mysqlConnect');

// @route   GET api/book
// @desc    Default Route
// @access  Public
router.get('/test', (req, res) => res.json({ msg : 'Tests post system' }));

// @route   GET api/book/addBook/:id
// @desc    Add Booking
// @access  Private
router.post('/addBook/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBookInput(req.body);

    
});

// @route   POST api/book/cancel/:postId/:bookId
// @desc    Post Cancel Booking 
// @access  Private
router.post('/cancel/:postId/:bookId', passport.authenticate('jwt', { session: false }), (req, res) => {

});

// @route   GET api/book/post/:id
// @desc    Get Booking of post 
// @access  Pubilc
router.get('/post/:id', (req, res) => {

});

// @route   GET api/book/user/:id
// @desc    Get Booking of user 
// @access  Private
router.get('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

});

// @route   GET api/book/:id
// @desc    Get Booking  
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

});

module.exports = router;