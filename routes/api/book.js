const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Op } = require('sequelize')

// Import Models 
const User = require('../../models/user');
const Post = require('../../models/post');
const Book = require('../../controller/sequelize')

// import input validation
const validateBookInput = require('../../validator/book');

// @route   GET api/book
// @desc    Default Route
// @access  Public
router.get('/test', (req, res) => res.json({ msg : 'Tests post system' }));

// @route   GET api/book/addBook/:id
// @desc    Add Booking
// @access  Private
router.post('/addBook/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBookInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Book.findOne({ where: { bookDate: req.body.bookDate, idPost: req.body.idPost, statusBook: 1,
        [Op.or]: [{
            [Op.and]: [{
                timeIn: {
                    [Op.lte]: parseFloat(req.body.timeOut)
                }
            },{
                timeOut: {
                    [Op.gte]: parseFloat(req.body.timeOut)
                }
            }]
        },{
            [Op.and]: [{
                timeIn: {
                    [Op.lte]: parseFloat(req.body.timeIn),
                }
            },{
                timeOut: {
                    [Op.gte]: parseFloat(req.body.timeIn)
                }
            }]
        },{
            [Op.and]: [{
                timeIn: {
                    [Op.gte]: parseFloat(req.body.timeIn),
                }
            },{
                timeOut: {
                    [Op.lte]: parseFloat(req.body.timeOut)
                }
            }]
        }]   
    }})
        .then((book) => {
            if (book) {
                // console.log('Book1')
                return res.status(401).json({ book: 'Booking Errors'})
            }
            Book.create(req.body)
                .then((book) => {
                    // console.log(book)
                    res.json(book)
                })
                .catch((err) => {
                    res.json({ book: 'Booking Errors'})
                })
        })
        .catch((err) => {
            res.json({ book: 'Booking Errors'})
        })
});

// @route   POST api/book/cancel/:postId/:bookId
// @desc    Post Cancel Booking 
// @access  Private
router.post('/cancel/:postId/:bookId', passport.authenticate('jwt', { session: false }), (req, res) => {
    let status = { statusBook: 0 }
    Book.update(status, { where: {idPost: req.params.postId, id: req.params.bookId, idUser: req.user.id, statusBook: 1} }) // returning: true it' not working mysql
        .then((book) => {
            if (book[0] === 0) {
                return res.status(401).json({ Book: 'Cancel Booking fail or Booking Cancel'})
            }
            res.json(book)
        })
        .catch((err) => {
            console.log(err)
            res.json({ Server: 'Server errors'})
        })
}); 

// @route   GET api/book/post/:id
// @desc    Get Booking of post 
// @access  Pubilc
router.get('/post/:id', (req, res) => {
    Book.findAll({ where: { idPost: req.params.id }})
        .then((book) => {
            if (book.length === 0) {
                return res.json({ Book: 'No have booking'})
            }
            res.json(book)
        })
        .catch((err) => {
            res.json({ Server: 'Server errors'})
        })
});

// @route   GET api/book/user/:id
// @desc    Get Booking of user 
// @access  Private
router.get('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Book.findAll({ where: { idUser: req.params.id }})
        .then((book) => {
            if (book.length === 0) {
                return res.json({ Book: 'No have booking'})
            }
            res.json(book)
        })
        .catch((err) => {
            res.json({ Server: 'Server errors'})
        })
});

// @route   GET api/book/:id
// @desc    Get Booking  
// @access  Private
router.get('/:id',(req, res) => {
    Book.findOne({ where: { id: req.params.id }})
        .then((book) => {
            if (!book) {
                return res.json({ Book: 'Book not found'})
            }
            res.json(book)
        })
        .catch((err) => {
            res.json({ Server: 'Server errors'})
        })
});

module.exports = router;