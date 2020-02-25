const Book = require('../models/book');
const Post = require('../models/post');

// import input validation
const validateBookInput = require('../validator/book');

exports.addBooking = async (req, res, next) => {
    const body = req.body;
    const { errors, isValid } = validateBookInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    if (body.detail.renter === req.user.id)
        return res.status(401).json({ Book: 'User Only' });

    const post = await Post.findOne({ _id: req.params.id, available: true });
    if (!post)
        return res
            .status(404)
            .json({ Book: 'Post not found or Post isnt avaiable' });

    const book = await Book.find({
        $or: [
            {
                $and: [
                    {
                        Date: body.Date
                    },
                    {
                        'detail.post': req.params.id
                    },
                    {
                        'detail.status': 1
                    },
                    {
                        $or: [
                            {
                                $and: [
                                    {
                                        'detail.timein': {
                                            $lte: parseFloat(
                                                body.detail.timeout
                                            )
                                        }
                                    },
                                    {
                                        'detail.timeout': {
                                            $gte: parseFloat(
                                                body.detail.timeout
                                            )
                                        }
                                    }
                                ]
                            },
                            {
                                $and: [
                                    {
                                        'detail.timein': {
                                            $lte: parseFloat(body.detail.timein)
                                        }
                                    },
                                    {
                                        'detail.timeout': {
                                            $gte: parseFloat(body.detail.timein)
                                        }
                                    }
                                ]
                            },
                            {
                                $and: [
                                    {
                                        'detail.timein': {
                                            $gte: parseFloat(body.detail.timein)
                                        }
                                    },
                                    {
                                        'detail.timeout': {
                                            $lte: parseFloat(
                                                body.detail.timeout
                                            )
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                $and: [
                    {
                        Date: body.Date
                    },
                    {
                        'detail.status': 1
                    },
                    {
                        'detail.user': body.detail.user
                    },
                    {
                        $or: [
                            {
                                $and: [
                                    {
                                        'detail.timein': {
                                            $lte: parseFloat(
                                                body.detail.timeout
                                            )
                                        }
                                    },
                                    {
                                        'detail.timeout': {
                                            $gte: parseFloat(
                                                body.detail.timeout
                                            )
                                        }
                                    }
                                ]
                            },
                            {
                                $and: [
                                    {
                                        'detail.timein': {
                                            $lte: parseFloat(body.detail.timein)
                                        }
                                    },
                                    {
                                        'detail.timeout': {
                                            $gte: parseFloat(body.detail.timein)
                                        }
                                    }
                                ]
                            },
                            {
                                $and: [
                                    {
                                        'detail.timein': {
                                            $gte: parseFloat(body.detail.timein)
                                        }
                                    },
                                    {
                                        'detail.timeout': {
                                            $lte: parseFloat(
                                                body.detail.timeout
                                            )
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    if (book.length === 0) {
        body.detail.in = body.detail.timein;
        body.detail.out = body.detail.timeout;
        const newBook = new Book(body);
        newBook.save().then((book) => {
            res.status(201).json(book);
        });
    } else {
        res.status(400).json({ Book: 'its cant book' });
    }
};

exports.cancelBooking = async (req, res, next) => {
    const postid = req.params.postId;
    const bookid = req.params.bookId;
    console.log(req.user.id);
    try {
        const book = await Book.findById(bookid);
        if (book.detail.status === 0)
            return res.status(400).json({ Book: 'Dont cancel book again' });
        if (req.user.id !== book.detail.user.toString())
            return res.status(401).json({ Book: 'User not authorized' });

        book.detail.status = 0;

        book.save().then((book) => res.status(200).json(book));
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed'))
            return res.status(404).json({ Book: `No Book found with that ID` });
        return res.sendStatus(500);
    }
};

exports.getBookofPost = async (req, res, next) => {
    const postid = req.params.id;

    const book = await Book.find({
        'detail.post': postid
    })
        .select({ __v: 0, created: 0 })
        .sort({ Date: -1 });
    // if (book.length === 0) return res.status(200).json({ Book: 'No have book of post'})

    res.status(200).json(book);
};

exports.getBookofUser = async (req, res, next) => {
    const userid = req.user.id;

    const book = await Book.find({
        'detail.user': userid
    })
        .select({ __v: 0, created: 0 })
        .sort({ Date: -1 });
    if (book.length === 0)
        return res.status(200).json({ Book: 'No have book of post' });

    res.status(200).json(book);
};

exports.getBook = async (req, res, next) => {
    const bookid = req.params.id;

    try {
        const book = await Book.findById(bookid).select({ __v: 0, created: 0 });
        res.status(200).json(book);
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed'))
            return res.status(404).json({ Book: `No Book found with that ID` });
        return res.sendStatus(500);
    }
};

exports.getBookAll = async (req, res, next) => {
    const book = await Book.find()
        .select({ __v: 0, created: 0 })
        .sort({ Date: -1 });
    res.status(200).json({
        book: book.length !== 0 ? book : 'No have book'
    });
};

exports.check = async (req, res, next) => {
    const bookid = req.params.id;
    const userid = req.user.id;
    const body = req.body;
    try {
        const book = await Book.findById(bookid);
        if (
            book.detail.user.toString() !== userid &&
            book.detail.renter.toString() !== userid
        )
            return res.status(201).json({ Check: 'User not authorized' });

        if (book.detail.user.toString() === userid) {
            if (body.check === true) {
                if (book.check.checkin.status === false)
                    book.check.checkin.user = true;
                else return res.status(200).json({ Check: true });
            } else {
                if (book.check.checkout.status === false)
                    book.check.checkout.user = true;
                else return res.status(200).json({ Check: true });
            }
        } else {
            if (body.check === true) {
                if (book.check.checkin.status === false)
                    book.check.checkin.renter = true;
                else return res.status(200).json({ Check: true });
            } else {
                if (book.check.checkout.status === false)
                    book.check.checkout.renter = true;
                else return res.status(200).json({ Check: true });
            }
        }
        if (
            book.check.checkin.user === true &&
            book.check.checkin.renter === true
        )
            book.check.checkin.status = true;
        if (
            book.check.checkout.user === true &&
            book.check.checkout.renter === true
        )
            book.check.checkout.status = true;
        if (
            book.check.checkin.status === true &&
            book.check.checkout.status === true
        )
            book.detail.status = 0;

        book.save().then((book) => res.status(200).json(book));
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed'))
            return res.status(404).json({ Book: `No Book found with that ID` });
        return res.sendStatus(500);
    }
};
