const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../../config/db.mongodb');
const passport = require('passport');
const formidable = require('formidable');
const fs = require('fs');

// import input validation
const validateRegisterInput = require('../../validator/register');
const validateLoginInput = require('../../validator/login');

// import User Model
const User = require('../../models/user');

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get('/test', (req, res) => { 
    // console.log('Test');
    res.json({ msg : 'Tests user system' })
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    // console.log('register');
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        // console.log(isValid);
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username }).then((user) => {
        if (user) {
            errors.username = `Username already exists`;
            return res.status(400).json(errors);
        } 
        
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            name: {
                fname: req.body.fname,
                lname: req.body.lname
            },
            email: req.body.email,
            // photo_user: {
            //     data: fs.readFileSync(req.body.photo_user.path),
            //     contentType: req.body.photo_user.type
            // },
            birth: req.body.birth,
            age: req.body.age,
            phone: req.body.phone,
            card: req.body.card,
            // photo_card: {
            //     data: fs.readFileSync(req.body.photo_card.path),
            //     contentType: req.body.photo_card.type
            // }
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then((user) => {
                        res.json(user);
                        // console.log(res.user);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
        })
    })
    .catch((err) => {
        console.log(err);
    })
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    // console.log('login');
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    // Find user by username
    User.findOne({ username }).then((user) => {
        // Check for user
        if (!user) {
            errors.username = `User not found`;
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password).then((isMath) => {
            if (isMath) {
                // User Matched
                // const payload = { id:user.id, name: user.name, photo_user: user.photo_user }; // Create JWT Payload
                const payload = { id:user.id, name: user.name, email: user.email };

                // Sign Token
                jwt.sign(payload, key.secretOrKey, { expiresIn: 3600}, (err, token) => {
                    res.json({ 
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            } else {
                errors.password = `Password incorrect`;
                return res.status(400).json(errors);
            }
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ 
        id: req.user.id,
        name: {
            fname: req.user.fname,
            lname: req.user.lname
        },
        email: req.user.email
    })
});

module.exports = router;