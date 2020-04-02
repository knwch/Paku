const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    register,
    login,
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

// @route       POST api/admin/register
// @desc        Register Admin 
// @access      Public
router.post('/register', register)

// @route       GET api/admin/login
// @desc        Login Admin / Returning JWT Token
// @access      Public
router.post('/login', login)

// @route       GET api/admin/user
// @desc        Get All user
// @access      Public
router.get('/user', passport.authenticate('jwt', { session: false }), userall)

router.get('/confirm', passport.authenticate('jwt', { session: false }), userConfirm)

router.get('/user/:id', passport.authenticate('jwt', { session: false }), userById)

router.get('/confirmUser/:id', passport.authenticate('jwt', { session: false }), confirmUser)

router.get('/unConfirm/:id', passport.authenticate('jwt', { session: false }), unConfirmUser)

router.delete('/del/:id', passport.authenticate('jwt', { session: false }), delUser)

module.exports = router