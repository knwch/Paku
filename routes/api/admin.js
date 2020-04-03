const express = require('express');
const router = express.Router();
const passportAdmin = require('passport');
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
// @access      Private
router.get('/user', passportAdmin.authenticate('jwt', { session: false }), userall)

// @route       GET api/admin/confirm
// @desc        Get user require confirm
// @access      Private
router.get('/confirm', passportAdmin.authenticate('jwt', { session: false }), userConfirm)

// @route       GET api/admin/user/:id
// @desc        Get user by id
// @access      Private
router.get('/user/:id', passportAdmin.authenticate('jwt', { session: false }), userById)

router.get('/confirmUser/:id', passportAdmin.authenticate('jwt', { session: false }), confirmUser)

router.get('/unConfirm/:id', passportAdmin.authenticate('jwt', { session: false }), unConfirmUser)

// @route       DELETE api/admin/del/:id
// @desc        Delete user, post by id
// @access      Private
router.delete('/del/:id', passportAdmin.authenticate('jwt', { session: false }), delUser)

module.exports = router