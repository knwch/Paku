const User = require('../models/user');
const Post = require('../models/post');
const Book = require('../models/book');

exports.userall = async (req, res) => {
    const errors = {};

    let auth = authAadmin(req.user.status);
    if (auth) {
        return res.status(401).json(auth);
    }
    const user = await User.find().where('status', 0).sort({ created: -1 });
    if (user.length === 0) {
        errors.user = `No have user`;
        return res.status(200).json(errors);
    }
    res.status(200).json(user);
};

exports.userConfirm = async (req, res) => {
    const errors = {};

    let auth = authAadmin(req.user.status);
    if (auth) {
        return res.status(401).json(auth);
    }
    const user = await User.find({ Card: { confirm: false } });
    if (user.length === 0) {
        errors.user = `No have user`;
        return res.status(200).json(errors);
    }
    res.status(200).json(user);
};

exports.userById = async (req, res) => {
    const errors = {};
    const id = req.params.id;

    let auth = authAadmin(req.user.status);

    if (auth) {
        return res.status(401).json(auth);
    }

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed')) {
            errors.user = `No User found with that ID`;
            return res.status(404).json(errors);
        }
        return res.sendStatus(500);
    }
};

exports.confirmUser = async (req, res) => {
    const errors = {};
    const id = req.params.id;

    let auth = authAadmin(req.user.status);

    if (auth) {
        return res.status(401).json(auth);
    }
    try {
        const user = await User.findById(id);
        if (user.Card.idCard === 0 || user.Card.laser === '') {
            errors.user = `Idcard is not empty`;
            return res.status(400).json(errors);
        }
        if (user.Card.confirm === true) {
            return res.status(200).json({ user: `User confirm success` });
        }
        user.Card = {
            idCard: user.Card.idCard,
            laser: user.Card.laser,
            confirm: true
        };
        const result = await User.findOneAndUpdate({ _id: id }, user, {
            new: true,
            runValidators: true
        });
        res.status(200).json(result);
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed')) {
            errors.user = `No User found with that ID`;
            return res.status(404).json(errors);
        }
        return res.sendStatus(500);
    }
};

exports.unConfirmUser = async (req, res) => {
    const errors = {};
    const id = req.params.id;

    let auth = authAadmin(req.user.status);

    if (auth) {
        return res.status(401).json(auth);
    }

    try {
        const user = await User.findById(id);
        if (user.Card.idCard === 0 || user.Card.laser === '') {
            errors.user = `Idcard is not empty`;
            return res.status(400).json(errors);
        }
        if (user.Card.confirm === true) {
            return res.status(200).json({ user: `User confirm success` });
        }
        user.Card = {
            idCard: 0,
            laser: '',
            confirm: false
        };
        const result = await User.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true
        });
        res.status(200).json(result);
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed')) {
            errors.user = `No User found with that ID`;
            return res.status(404).json(errors);
        }
        return res.sendStatus(500);
    }
};

exports.delUser = async (req, res) => {
    const errors = {};
    const id = req.params.id;

    let auth = authAadmin(req.user.status);
    if (auth) {
        return res.status(401).json(auth);
    }

    try {
        await User.findOneAndDelete({ _id: id });
        await Post.deleteMany({ user: id });
        await Book.deleteMany({
            $or: [
                {
                    'detail.user': id
                },
                {
                    'detail.renter': id
                }
            ]
        });
        // await user.remove()
        res.status(200).json({ success: true });
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed')) {
            errors.user = `No User found with that ID`;
            return res.status(404).json(errors);
        }
        return res.sendStatus(500);
    }
};

const authAadmin = (status) => {
    let errors = {};
    if (status === 0) {
        errors.admin = `User not authorized`;
        return errors;
    } else {
        errors = null;
        return errors;
    }
};
