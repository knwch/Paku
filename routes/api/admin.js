const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    userall,
    userConfirm,
    userById,
    confirmUser,
    unConfirmUser,
    delUser
} = require('../../controller/admin')

// @route       GET api/admin
// @desc        Default Route
// @access      Public
router.get('/test', (req, res) => res.json({ msg : 'Tests admin system' }));

// @route       GET api/admin/user
// @desc        Get All user
// @access      Private
router.get('/user', passport.authenticate('jwt', { session: false }), userall)

// @route       GET api/admin/confirm
// @desc        Get user require confirm
// @access      Private
router.get('/confirm', passport.authenticate('jwt', { session: false }), userConfirm)

// @route       GET api/admin/user/:id
// @desc        Get user by id
// @access      Private
router.get('/user/:id', passport.authenticate('jwt', { session: false }), userById)

// @route       GET api/admin/confirmUser/:id
// @desc        Confirm user
// @access      Private
router.get('/confirmUser/:id', passport.authenticate('jwt', { session: false }), confirmUser)

// @route       GET api/admin/unConfirm/:id
// @desc        UnConfirm user
// @access      Private
router.get('/unConfirm/:id', passport.authenticate('jwt', { session: false }), unConfirmUser)

// @route       DELETE api/admin/del/:id
// @desc        Delete user, post by id
// @access      Private
router.delete('/del/:id', passport.authenticate('jwt', { session: false }), delUser)

module.exports = router