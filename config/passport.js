const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Admin = mongoose.model('admin')
const keys =require('../config/db.mongodb');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then((user) => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch((err) => {
            console.log(err);
        })
    }))
}

module.exports = (passportAdmin) => {
    passportAdmin.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Admin.findById(jwt_payload.id)
        .then((admin) => {
            if (admin) {
                return done(null, admin);
            }
            return done(null, false);
        })
        .catch((err) => {
            console.log(err);
        })
    }))
}