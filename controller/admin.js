const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = require('../config/db.mongodb')

// import input validation
const validateLoginInput = require('../validator/login')

const Admin = require('../models/admin')
const User = require('../models/user')
const Post = require('../models/post')

exports.register = (req, res) => {
    const errors = {}

    if (!req.body) {
        errors.username = `username/password is required`
        return res.status(400).json(errors)
    }

    Admin.findOne({username: req.body.username})
        .then((admin) => {
            if (admin) {
                errors.username = `Username alrady exists`;
                return res.status(400).json(errors)
            }

            const newAdmin = new Admin({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if (err) throw err
                    newAdmin.password = hash
                    newAdmin.save()
                        .then((admin) => {
                            res.json(admin)
                            // console.log(user);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.login = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    // Check Validation 
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const username = req.body.username
    const password = req.body.password

    Admin.findOne({ username }).then((admin) => {
        // Check for admin
        if (!admin) {
            errors.username = `Username not found`
            return res.status(404).json(errors)
        }

        // Check Password
        bcrypt.compare(password, admin.password).then(isMatch => {
            // Admin Matched
            if (isMatch) {
                const payload = { id: admin.id, name: admin.name } // Create JWT Payload

                // Sign Token
                jwt.sign(payload, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            } else {
                errors.password = `Password Incorret`
                return res.status(404).json(errors)
            }
        })
    })
}   

exports.userall = (req, res) => {
    const errors = {}

    User.find()
        .then((user) => {
            if (user.length === 0) {
                errors.user = `No have user`
                return res.status(200).json(errors);
            }
            res.json(user)
        })
        .catch((err) => {
            errors.user = `Server errors`
            res.json(errors)
        })
}

exports.userConfirm = (req, res) => {
    const errors = {}

    User.find({Card:{confirm: false}})
        .then((user) => {
            if (user.length === 0) {
                errors.user = `No have user`
                return res.status(200).json(errors);
            }
            res.json(user)
        })
        .catch((err) => {
            errors.user = `No have user`
            res.json(errors)
        })
}

exports.userById = (req, res) => {
    const errors = {}

    User.findById(req.params.id)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            errors.user = `No User found with that ID`
            res.json(errors)
        })
}

exports.confirmUser = (req, res) => {
    const errors = {}

    User.findById(req.params.id)
        .then((user) => {
            if (user.Card.idCard === 0 || user.Card.laser === "") {
                errors.user = `Idcard is not empty`
                return res.status(400).json(errors)
            }
            if (user.Card.confirm === true) {
                return res.json({ user: `User confirm success`})
            }
            user.Card = {
                idCard: user.Card.idCard,
                laser: user.Card.laser,
                confirm: true
            }
            user.save().then((user) => res.json(user))
        })
        .catch((err) => {
            errors.user = `No User found with that ID`
            res.json(errors)
        })
}

exports.unConfirmUser = (req, res) => {
    const errors = {}

    User.findById(req.params.id)
        .then((user) => {
            if (user.Card.idCard === 0 || user.Card.laser === "") {
                errors.user = `Idcard is not empty`
                return res.status(400).json(errors)
            }
            if (user.Card.confirm === true) {
                return res.status(400).json({ user: `User confirm success`})
            }
            user.Card = {
                idCard: 0,
                laser: "",
                confirm: false
            }
            user.save().then((user) => res.json({ success: true }))
        })
        .catch((err) => {
            errors.user = `No User found with that ID`
            res.json(errors)
        })
}

exports.delUser = (req, res) => {
    const errors = {}

    User.findByIdAndDelete({ _id: req.params.id }).then((user) => {
        if (!user) {
            errors.user = `No User found with that ID`
            res.status(404).json(errors)
        }
        Post.deleteMany({ user: req.params.id })
            .then((del) => {
                if (del.ok !== 1) {
                    errors.user = `Delete fail`
                    return res.status(400).json(errors)
                }
                res.json({ success: true})
            })
            .catch((err) => {
                errors.user = err.message
                res.json(errors)
            })
    })
    .catch((err) => {
        errors.user = `No User found with that ID`
        res.json(errors)
    })
}