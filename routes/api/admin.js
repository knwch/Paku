const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    register,
    login
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



module.exports = router;