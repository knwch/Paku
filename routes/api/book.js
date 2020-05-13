express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    addBooking,
    cancelBooking,
    getBookofPost,
    getBookofUser,
    getBook,
    check,
    getBookAll
} = require('../../controller/book')

// @route   GET api/book
// @desc    Default Route
// @access  Public
router.get('/test', (req, res) => res.json({ msg : 'Tests post system' }));

// @route   GET api/book/addBook/:id
// @desc    Add Booking
// @access  Private
router.post('/addBook/:id', passport.authenticate('jwt', { session: false }), addBooking)

// @route   POST api/book/cancel/:postId/:bookId
// @desc    Post Cancel Booking 
// @access  Private
router.post('/cancel/:postId/:bookId', passport.authenticate('jwt', { session: false }), cancelBooking) 

// @route   GET api/book/post/:id
// @desc    Get Booking of post 
// @access  Pubilc
router.get('/post/:id', getBookofPost)

// @route   GET api/book/user/:id
// @desc    Get Booking of user 
// @access  Private
router.get('/user/:id', passport.authenticate('jwt', { session: false }), getBookofUser)

// @route   GET api/book/:id
// @desc    Get Booking  
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false}), getBook)

// @route   GET api/book/
// @desc    Get Booking all 
// @access  Pubilc
router.get('/', getBookAll)

// @route   POST api/book/check/:id
// @desc    Post Check  
// @access  Private 
router.post('/check/:id', passport.authenticate('jwt', { session: false }), check)

module.exports = router