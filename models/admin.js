const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        typ: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);