const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../../config/db.mongodb');
const passport = require('passport');

// import input validation
const validateLoginInput = require('../../validator/login');

// import User Model
const Admin = require('../../models/admin');

// @route       GET api/admin
// @desc        Default Route
// @access      Public
router.get('/test', (req, res) => res.json({ msg : 'Tests admin system' }));

// @route       GET api/admin/login
// @desc        Login Admin / Returning JWT Token
// @access      Public
router.post('/admin_login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({ username }).then((admin) => {
        // Check for admin
        if (!admin) {
            errors.username = `Username not found`;
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, admin.password).then(isMatch => {
            // Admin Matched
            if (isMatch) {
                const payload = { id: admin.id, name: admin.name }; // Create JWT Payload

                // Sign Token
                jwt.sign(payload, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            } else {
                errors.password = `Password Incorret`;
                return res.status(404).json(errors)
            }
        });
    })
});

// @route       GET api/admin/current
// @desc        Return current admin
// @access      Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.admin.id,
        username: req.admin.username,
    });
});

module.exports = router;