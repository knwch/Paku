// load the things we need
let mongoose = require('mongoose');

// define the schema for our user model
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 2,
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
        fname:{
            type: String,
            required: true
        },
        lname:{
            type: String,
            required: true 
        }
    },
    email: {
        type: String,
        required: true
    },
    // photo_user: {
    //     data: Buffer,
    //     contentType
    // },
    birth: {
        type: String,
        required: true 
    },
    // age: {
    //     type: Number,
    //     min: 18,
    //     required: true
    // },
    phone: {
        type: String,
        required: true
    },
    card: {
        type: Number,
    },
    // photo_card: {
    //     data: Buffer,
    //     contentType
    // },
    status: {
        type: String,
        default: "renter"
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