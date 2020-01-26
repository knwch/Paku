const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        typ: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);