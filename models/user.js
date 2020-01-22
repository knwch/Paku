// load the things we need
let mongoose = require('mongoose');

// define the schema for our user model
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        min: 2,
        max: 30,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 2,
        max: 30,
        required: true
    },
    name: {
        fname:{
            type: String,
            trim: true,
            required: true
        },
        lname:{
            type: String,
            trim: true,
            required: true 
        }
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    photo_user: {
        data: Buffer,
        contentType
    },
    birth: {
        type: String,
        required: true 
    },
    age: {
        type: Number,
        min: 18,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    card: {
        type: Number,
        trim: true,
        require: true
    },
    photo_card: {
        data: Buffer,
        contentType
    },
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
module.exports = mongoose.model('User', userSchema);