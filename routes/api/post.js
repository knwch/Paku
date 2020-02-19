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
router.post('/addPost', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    User.findById(req.user.id).where('Card.confirm', true)
        .then((user) => {
            if (!user) {
                errors.user = 'User must comfirm CardID'
                return res.json(errors)
            }


            if (!isValid) {
                console.log(errors)
                return res.status(400).json(errors);
            }

            const newPost = new Post({
                title: req.body.title,
                detail: {
                    typeofpark: req.body.typeofpark,
                    numberofcar: req.body.numberofcar,
                    typeofcar: req.body.typeofcar,
                    explain: req.body.explain,
                    rule: req.body.rule,
                    nearby: req.body.nearby,
                    facility: req.body.facility
                },
                location: {
                    address: req.body.address,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude
                },
                date: {
                    open: req.body.open,
                    close: req.body.close
                },
                user: req.user.id,
                price: req.body.price
            })

            newPost.save()
                .then((post) => {
                    res.json(post);
                })
        })
        .catch((err) => {
            res.json(err);
        });
});

// @route   DELETE api/post/delete/:postId
// @desc    Delete park my self
// @access  Private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({ post : "User not authorized" });
            }

            post.remove().then((post) => {
                res.json({ post: "Success"});
            })
        })
        .catch((err) => {
            res.json({ post: "Post not found "});
        })
});

// @route   POST api/post/edit/:postId
// @desc    Edit info park my self
// @access  Private
router.post('edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

});

module.exports = router;