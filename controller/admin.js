const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = require('../config/db.mongodb')

// import input validation
const validateLoginInput = require('../validator/login')

// const Admin = require('../models/admin')
const User = require('../models/user')
const Post = require('../models/post')

exports.userall = (req, res) => {
    const errors = {}

    let auth = authAadmin(req.user.status)
    if (auth) {
        return res.status(401).json(auth)
    }

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

    let auth = authAadmin(req.user.status)
    if (auth) {
        return res.status(401).json(auth)
    }

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

    let auth = authAadmin(req.user.status)
    if (auth) {
        return res.status(401).json(auth)
    }

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

    let auth = authAadmin(req.user.status)
    if (auth) {
        return res.status(401).json(auth)
    }

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

    let auth = authAadmin(req.user.status)
    if (auth) {
        return res.status(401).json(auth)
    }

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
            user.save().then((user) => res.json(user))
        })
        .catch((err) => {
            errors.user = `No User found with that ID`
            res.json(errors)
        })
}

exports.delUser = (req, res) => {
    const errors = {}

    let auth = authAadmin(req.user.status)
    if (auth) {
        return res.status(401).json(auth)
    }

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

const authAadmin = (status) => {
    let errors = {}
    if (status === 0) {
        errors.admin = `User not authorized`
        return errors
    } else {
        errors = null
        return errors
    }

}