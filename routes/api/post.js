const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import Models 
const User = require('../../models/user');
const Post = require('../../models/post');

// import input validation
const validatePostInput = require('../../validator/post');

// @route   GET api/post
// @desc    Default Route
// @access  Public
router.get('/test', (req, res) => res.json({ msg : 'Tests post system' }));

// @route   GET api/profile/allpost
// @desc    Get All posts 
// @access  Public
router.get('/allpost', (req, res) => {
    Post.find()
        .then((post) => {
            if (post.length === 0) {
                return res.status(404).json({ msg : 'Posts not found' });
            }
            res.json(post);
        })
        .catch((err) => {
            res.state(404).json(err);
        })
});

// @route   GET api/post/handle/:postId
// @desc    Get the post data of the params passed
// @access  Pubilc
router.get('/handle/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.status(404).json({ msg : 'No hostel found with that ID'});
        })
});

// @route   POST api/post/addPost
// @desc    Post park my self
// @access  Private
router.post('/addPost', passport.authenticate('jwt', { session: false }), authenticateIdCard, (req, res) => {
    res.json({sdf:"dsfsdfsd"})
});

function authenticateIdCard(req, res, next) {
    User.findById(req.user.id).and({Crad:{confirm: true}})
        .then((user) => {
            console.log("ssrsa")
            next();
        })
        .catch((err) => {
            console.log("No")
            res.json({confirm : "User must comfirm CardID" });
        });
} 

module.exports = router;