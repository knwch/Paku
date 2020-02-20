// load the things we need
let mongoose = require('mongoose');

// define the schema for our user model
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 6,
        max: 30,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        max: 30,
        required: true
    },
    name: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true 
        }
    },
    email: {
        type: String,
        required: true
    },
    photo_user: {
        type: String,
        default: 'https://uppic.cc/d/6SMp'
    },
    aboutMe : {
        type: String,
        default: ' '
    },
    phone: {
        type: String,
        required: true
    },
    terms: {
        type: Boolean,
        required: true
    },
    Card: {
        idCard: {
            type: Number,
            default: 0
        },
        confirm: {
            type: Boolean,
            default: 'false'
        }
    },
    photo_card: {
        type: String
    },
    rate: {
        type: Number,
        default: 0
    },
    updated: Date,
    resetPasswordLink: {
        data: String,
        default: ""
    },
    created: {
        type: Date,
        default: Date.now
    },
});

// create the model for users and expose it to our app
module.exports = User = mongoose.model('users', userSchema);