const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import Models 
const User = require('../../models/user');
const Post = require('../../models/post');

// import input validation
const validateEditProfile = require('../../validator/edit');

// @route       GET api/profile/test
// @desc        Default Route
// @access      Public
router.get('/test', (req, res) => res.json({ msg : 'Tests profile system' }));

// @route   GET api/profile/
// @desc    Get current users 
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // let errors = {}; 
    User.findById(req.user.id) 
        .then((profile) => {
            res.json(profile)
        })
        .catch((err) => {
            res.status(404).json(err)
        });
});

// @route   GET api/profile/alluser
// @desc    Get All users 
// @access  Public
router.get('/alluser', (req, res) => {
    User.find()
        .then((profile) => {
            if (profile.length === 0) {
                return res.status(200).json({ msg : 'User not found' });
            }
            res.json(profile);
        })
        .catch((err) => {
            console.log(err);
        })
});

// @route   POST api/profile/edit
// @desc    post edit users profile
// @access  Private
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEditProfile(req.body);
    
    // Check Validation
    if (!isValid) {
        console.log(errors);
        return res.status(400).json(errors);
    }

    User.findById(req.user.id) 
        .then((userData) => { 
            userData.phone = req.body.phone;
            userData.aboutMe = req.body.about;
            
            userData.save()
                .then((user) => {
                    res.json(user);
                })
        })
        .catch((err) => {
            res.json({ error: 'User not found'});
        });
})

// @route   DELETE api/profile/delete
// @desc    Get current users profile
// @access  Private
router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findOneAndRemove({ postBy: req.user.id}).then(
        User.findByIdAndDelete({ _id: req.user.id }).then(
            res.json({ success: true })
        )
        .catch((err) => {
            console.log(err)
        })
    )
});

// @route   GET api/profile/handle/:userName
// @desc    Get the profile data of the params passed
// @access  Private
router.get('/handle/:userName', passport.authenticate('jwt', { session: false }), (req, res) => {
    let errors = {};

    User.findOne({ username: req.parms.userName })
        .then((profile) => {
            if (!profile) {
                errors.msg = 'User not found';
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch((err) => {
            res.state(404).json(err);
        });
});
module.exports = router;