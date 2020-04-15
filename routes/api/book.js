 express = require('express');
const router = express.Router();
const passport = require('passport');
const { Op } = require('sequelize')

// Import Models 
const User = require('../../models/user');
const Post = require('../../models/post');
const { Book, Check } = require('../../controller/sequelize')

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
    let body = req.body
    let check
    if (!isValid) {
        return res.status(400).json(errors)
    }

    if (req.body.renter === req.user.id) {
        return res.status(401).json({ Book: 'User Only'})
    }
    
    Book.findOne({ where: { bookDate: req.body.bookDate, idPost: req.params.id, statusBook: 1,
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
                return res.status(400).json({ book: 'Booking Errors'})
            }
            Book.create(body)
                .then((book) => {
                    check = {
                        idRenter: body.renter,
                        idUser: body.idUser,
                        bookId: book.id
                    }
                    Check.create(check)
                        .then((check) => {
                            res.status(200).json(book)
                        })
                })
                .catch((err) => {
                    res.status(400).json({ book: 'Booking Errors'})
                })
        })
        .catch((err) => {
            res.sendStatus(500)
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
                return res.status(400).json({ Book: 'Cancel Booking fail or Booking Cancel'})
            }
            res.status(200).json(book)
        })
        .catch((err) => {
            res.sendStatus(500)
        })
}); 

// @route   GET api/book/post/:id
// @desc    Get Booking of post 
// @access  Pubilc
router.get('/post/:id', (req, res) => {
    Book.findAll({ where: { idPost: req.params.id }})
        .then((book) => {
            if (book.length === 0) {
                return res.status(200).json({ Book: 'No have booking'})
            }
            res.status(200).json(book)
        })
        .catch((err) => {
            res.sendStatus(500)
        })
});

// @route   GET api/book/user/:id
// @desc    Get Booking of user 
// @access  Private
router.get('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Book.findAll({ where: { idUser: req.params.id }, include: [{ model: Check }] })
        .then((book) => {
            if (book.length === 0) {
                return res.status(200).json({ Book: 'No have booking'})
            }
            res.status(200).json(book)
        })
        .catch((err) => {
            res.sendStatus(500)
        })
});

// @route   GET api/book/:id
// @desc    Get Booking  
// @access  Private
router.get('/:id',(req, res) => {
    Book.findOne({ where: { id: req.params.id }, include: [{ model: Check }]})
        .then((book) => {
            if (!book) {
                return res.status(404).json({ Book: 'Book not found'})
            }
            res.status(200).json(book)
        })
        .catch((err) => {
            res.sendStatus(500)
        })
});

// @route   POST api/book/check/:id
// @desc    Post Check  
// @access  Private 
router.post('/check/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let temp 
    Check.findOne({ where: { id: req.params.id }})
        .then((check) => {
            temp = {
                idRenter: check.idRenter,
                idUser: check.idUser,
                checkInStatus: check.checkInStatus,
                checkInUser: check.checkInUser,
                checkInRenter: check.checkInRenter,
                checkOutStatus: check.checkOutStatus,
                checkOutUser: check.checkOutUser,
                checkOutRenter: check.checkOutRenter
            }
            if (check.idUser !== req.user.id && check.idRenter !== req.user.id) return res.status(401).json({ Check: 'User not authorized'})
            if (req.user.id === check.idUser) {
                if (req.body.check === true) {
                    if (temp.checkInStatus === false) {
                        temp.checkInUser = true
                        if (temp.checkInUser === true &&  temp.checkInRenter === true) {
                            temp.checkInStatus = true
                        }
                        Check.update(temp ,{ where: { id: req.params.id }})
                            .then((check) => {
                                if (check[0] === 0) {
                                    return res.status(400).json({ Check: 'Error'})
                                }
                                res.status(200).json(check)
                            })
                    } else {
                        res.status(200).json({ Check: true })
                    }
                } else {
                    if (temp.checkOutStatus === false) {
                        temp.checkOutUser = true
                        if (temp.checkOutUser === true &&  temp.checkOutRenter === true) {
                            temp.checkOutStatus = true
                        }
                        Check.update(temp ,{ where: { id: req.params.id }})
                            .then((check) => {
                                if (check[0] === 0) {
                                    return res.status(400).json({ Check: 'Error'})
                                }
                                res.status(200).json(check)
                            })
                    } else {
                        res.status(200).json({ Check: true })
                    }
                }
            } else {
                if (req.body.check === true) {
                    if (temp.checkInStatus === false) {
                        temp.checkInRenter = true
                        if (temp.checkInUser === true &&  temp.checkInRenter === true) {
                            temp.checkInStatus = true
                        }
                        Check.update(temp ,{ where: { id: req.params.id }})
                            .then((check) => {
                                if (check[0] === 0) {
                                    return res.status(400).json({ Check: 'Error'})
                                }
                                res.status(200).json(check)
                            })
                    } else {
                        res.status(200).json({ Check: true })
                    }
                } else {
                    if (temp.checkOutStatus === false) {
                        temp.checkOutRenter = true
                        if (temp.checkOutUser === true &&  temp.checkOutRenter === true) {
                            temp.checkOutStatus = true
                        }
                        Check.update(temp ,{ where: { id: req.params.id }})
                            .then((check) => {
                                if (check[0] === 0) {
                                    return res.status(400).json({ Check: 'Error'})
                                }
                                res.status(200).json(check)
                            })
                    } else {
                        res.status(200).json({ Check: true })
                    }
                }
            }
        })
        .catch((err) => {
            res.status(404).json({ Check: 'No Check found with that ID'})
        })
})

module.exports = router