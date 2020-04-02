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
router.get('/allPost', (req, res) => {
    Post.find()
        .then((post) => {
            if (post.length === 0) {
                return res.status(200).json({ post: 'No have post' });
            }
            res.json(post);
        })
        .catch((err) => {
            res.status(404).json(err);
        })
});

// @route   GET api/post/handle/:postId
// @desc    Get the post data of the params passed
// @access  Pubilc
router.get('/handle/:id', (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.status(404).json({ post: 'No Post found with that ID'});
        })
});

// @route   POST api/post/addPost
// @desc    Post park my self
// @access  Private
router.post('/addPost', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    let err = {}

    User.findById(req.user.id).where('Card.confirm', true)
        .then((user) => {
            if (!user) {
                err.user = 'User must comfirm IDCard'
                return res.status(400).json(err)
            }

            if (!isValid) {
                return res.status(400).json(errors);
            }

            const newPost = new Post({
                title: req.body.title,
                photos: req.body.imagePost,
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

            // res.json(newPost)
            newPost.save()
                .then((post) => {
                    res.json(post);
                })
        })
        .catch((err) => {
            res.status(404).json({ user: 'No User found with that ID'});
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
                res.json({ success: true});
            })
        })
        .catch((err) => {
            res.status(404).json({ post: "Post not found "});
        })
});

// @route   POST api/post/edit/:id
// @desc    Edit info park my self
// @access  Private
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!isValid) {
                // console.log(errors)
                return res.status(400).json(errors)
            }

            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({ post : "User not authorized" });
            }

            post.title = req.body.title;
            post.photos = req.body.imagePost;
            post.detail.typeofpark = req.body.typeofpark;
            post.detail.numberofcar = req.body.numberofcar;
            post.detail.typeofcar = req.body.typeofcar;
            post.detail.explain = req.body.explain;
            if (req.body.rule) post.detail.rule = req.body.rule;
            else post.detail.rule = undefined;
            if (req.body.nearby) post.detail.nearby = req.body.nearby;
            else post.detail.nearby = undefined;
            if (req.body.facility) post.detail.facility = req.body.facility;
            else post.detail.facility = undefined;
            post.location = {
                address: req.body.address,
                longitude: req.body.longitude,
                latitude: req.body.latitude
            }
            post.date.open = req.body.open;
            post.date.close = req.body.close;
            post.price = req.body.price;

            post.save().then((post) => {
                res.json(post);
            })
        })
        .catch((err) => {
            res.status(404).json({ post: 'No Post found with that ID'});
        });
});

// @route   POST api/post/comment/:id
// @desc    Post comment in post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById({ _id: req.params.id })
        .then((post) => {
            if (!req.body.rate) {
                return res.status(400).json({ comment: 'rateing field is required'});
            }

            const newComment = {
                user: req.user.id,
                name: req.user.name,
                comment: req.body.comment,
                photoUser: req.user.photo_user,
                rate: req.body.rate
            }

            const sum = post.rate.sum + req.body.rate;
            const count = post.comments.length + 1 ;
            const rate = sum / count;

            post.rate = {
                sum: sum,
                rating: rate
            }

            post.comments.unshift(newComment);

            // res.json(post)
            post.save().then((post) => {
                res.json(post);
            })
        })
        .catch((err) => {
            res.status(404).json({ post: 'No Post found with that ID'});
        });
});

// // @route   DELETE api/post/comment/delete/:id
// // @desc    Delete comment in post
// // @access  Private
// router.delete('/comment/delete/:postId/:commentId', passport.authenticate('jwt', { session: false }), (req, res) => {
//     Post.findById(req.params.postId)
//         .then((post) => {
//             // Check to see if comment exists
//             if (
//                 post.comments.filter(
//                   comment => comment._id.toString() === req.params.commentId
//                 ).length === 0
//             ) {
//                 return res.status(404).json({ comment: 'Comment does not exist' });
//             }

//             // Get remove index
//             const removeIndex = post.comments.map((item) => item._id.toString()).indexOf(req.params.commentId);

//             if (post.user.toString() !== req.user.id) {
//                 return res.status(401).json({ post : "User not authorized" });
//             }

//             const rate = post.comments[removeIndex].rate
//             const sum = post.rate.sum - rate;
//             const count = post.comments.length - 1;
//             const rating = sum / count
//             post.rate = {
//                 sum: sum,
//                 rating: rating
//             }
//             // Splice comment out of array
//             post.comments.splice(removeIndex, 1);

//             post.save().then((post) => {
//                 res.json(post);
//             })
//         })
//         .catch((err) => {
//             res.json({ post: "No Post found with that ID"});
//         })
// });

// @route   POST api/post/avalible/:id
// @desc    Post avalible post 
// @access  Private
router.post('/available/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.body) {
        return res.status(400).json({ post: 'available is require'})
    }

    Post.findById(req.params.id)
        .then((post) => {
            if (req.user.id != post.user) {
                return res.status(400).json({ post: 'User not authorized'})
            }

            if (req.body.available === post.available) {
                post.available = !post.available
                post.save().then((post) => res.json(post))
            } else {
                return res.status(400).json({ post: 'Input isn t reqiured  '})
            }
        })
        .catch((err) => {
            res.status(404).json({ post: 'No Post found with that ID'})
        })
})

module.exports = router