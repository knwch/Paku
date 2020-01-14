// load the things we need
let mongoose = require('mongoose');

// define the schema for our user model
let userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    card:{
        type: String,
        require: true
    }
});

// create the model for users and expose it to our app
const User = module.exports = mongoose.model('User', userSchema);