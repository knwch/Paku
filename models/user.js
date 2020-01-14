// load the things we need
let mongoose = require('mongoose');

// define the schema for our user model
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
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
    brith: {
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
const User = module.exports = mongoose.model('User', userSchema);